(function () {
    var app = angular.module('schnitzelApp');

    app.controller('StatusCtrl', StatusCtrl);


    function StatusCtrl($scope, $http, $rootScope) {
        $scope.startGame = function(){
            console.log('clicked startbutton');
            $http.post('/api/game/playSession').then(function(res){
                if(res.status == 200){
                    localStorage['gameSession'] = res.data;
                    $scope.game.running = true;
                    $rootScope.$broadcast('fetchState');
                }else {
                    // TODO: Errorhandling
                }
            });
        };
        $scope.endGame = function(){
            $http.delete('/api/game/playSession/' + localStorage['gameSession']).then(function(res){
                localStorage.removeItem('gameSession');
                $scope.game.running = false;
            });
        };
    }
})();