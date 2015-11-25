(function () {
    var app = angular.module('schnitzelApp');

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $http) {
        $scope.game = {running: false};

        $scope.$watch('game.running', function(value){
            if(value){
                getState();
            }
        });

        if(localStorage.hasOwnProperty('gameSession')){
            $scope.game.running = true;
        }

        function getState(){
            var sessionID = localStorage['gameSession'];
            $http.get('/api/game/state/' + sessionID).then(function(res){
                console.log(res);
                if(res.status == 200){
                    $scope.game.sessionID = sessionID;
                    $scope.game.state = res.data;
                }else{
                    $scope.game.running = false;
                }
            });
        }
    }

})();