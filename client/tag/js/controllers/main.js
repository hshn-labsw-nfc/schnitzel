(function () {
    var app = angular.module('schnitzelApp');

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $http) {
        $scope.game = {running: false};
        $scope.alerts = [];

        $scope.$on('fetchState', getState);

        $scope.$on('alert', showAlert);

        if (localStorage.hasOwnProperty('gameSession')) {
            $scope.game.running = true;
        }

        function showAlert(u, message, type) {
            type = type || 'warning';
            $scope.alerts.push({message: message, type: type});
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.alerts.shift();
                });
            }, 2000);
        }

        function getState() {
            if($scope.game.running){
                var sessionID = localStorage['gameSession'];
                $http.get('/api/game/sessions/' + sessionID).success(function (data) {
                    console.log(data);
                    $scope.game.sessionID = sessionID;
                    $scope.game.state = data;
                    $scope.location = data.location;

                    location.hash = '/';
                }).error(function (err) {
                    $scope.game.running = false;
                    console.log(err);
                    $scope.$broadcast('alert', err, 'danger');
                });
            }
        }

        getState();
    }

})();