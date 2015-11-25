(function () {
    var app = angular.module('schnitzelApp');

    app.controller('StatusCtrl', StatusCtrl);


    function StatusCtrl($scope, $http) {
        $scope.startGame = function(){
            console.log('clicked startbutton');
            $http.post('/api/game/start').then(function(res){
                console.log(res);
                localStorage['gameSession'] = res.data;
                $scope.game.running = true;
            });
        };
        $scope.endGame = function(){
            localStorage.removeItem('gameSession');
            $scope.game.running = false;
        };
    }
})();