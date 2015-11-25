(function () {
    var app = angular.module('schnitzelApp');

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $http) {
        $scope.game = {running: false};
        $scope.alerts = [];

        $scope.$on('fetchState', getState);

        $scope.$on('alert', showAlert);

        if(localStorage.hasOwnProperty('gameSession')){
            $scope.game.running = true;
        }

        function showAlert(u, message){
            console.log(arguments);
            $scope.alerts.push({msg: message});
            setTimeout(function(){
                $scope.$apply(function(){
                    $scope.alerts.shift();
                });
            }, 2000);
        }

        function getState(){
            var sessionID = localStorage['gameSession'];
            $http.get('/api/game/state/' + sessionID).then(function(res){
                console.log(res);
                if(res.status == 200){
                    $scope.game.sessionID = sessionID;
                    $scope.game.state = res.data;
                    $scope.location = res.data.location;
                }else{
                    // TODO: Errorhandling
                    $scope.game.running = false;
                }
            });
        }
        getState();
    }

})();