(function () {
    var app = angular.module('schnitzelApp');

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $http) {
        $scope.main = {game: {running: false}};

        $scope.$watch('main.game.running', function(value){
            if(value){
                getState();
            }
        });

        if(localStorage.hasOwnProperty('gameSession')){
            $scope.main.game.running = true;
        }

        function getState(){
            var sessionID = localStorage['gameSession'];
            $http.get('api/game/status', function(){
                console.log('stuff');
            });
            $scope.main.game = {
                running: true,
                progress: {
                    done: 2,
                    count: 8
                }
            };
        }
    }

})();