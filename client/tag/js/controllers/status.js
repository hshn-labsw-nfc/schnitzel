(function () {
    var app = angular.module('schnitzelApp');

    app.controller('StatusCtrl', StatusCtrl);


    function StatusCtrl($scope, $http) {
        $scope.startGame = function(){
            console.log('clicked startbutton');
            $http.post('/api/game/start').then(function(res){
                if(res.status == 200){
                    localStorage['gameSession'] = res.data;
                    $scope.game.running = true;
                }else {
                    // TODO: Errorhandling
                }
            });
        };
        $scope.endGame = function(){
            localStorage.removeItem('gameSession');
            $scope.game.running = false;
        };
    }
})();