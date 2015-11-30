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
            var sessionID = localStorage['gameSession'];
            $http.get('/api/game/state/' + sessionID).success(function (res) {
                console.log(res);
                $scope.game.sessionID = sessionID;
                $scope.game.state = res.data;
                $scope.location = res.data.location;

                if ($scope.game.state.task == 'won') {
                    console.log('winnerscreen');
                    //location.hash = '/winner';
                }
            }).error(function (err) {
                $scope.game.running = false;
                console.log(err);
            });
        }

        getState();
    }

})();