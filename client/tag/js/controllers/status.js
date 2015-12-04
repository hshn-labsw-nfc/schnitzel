(function () {
    var app = angular.module('schnitzelApp');

    app.controller('StatusCtrl', StatusCtrl);


    function StatusCtrl($scope, $http, $rootScope) {
        $scope.caption = {
            findLocation: 'Ort finden',
            solveRiddle: 'Rätsel lösen',
            won: 'DU HAST GEWONNEN'
        };

        $scope.data = {};

        $scope.startGame = function(){
            console.log('clicked startbutton',$scope.data.groupName);
            $http.post('/api/game/sessions',{groupName: $scope.data.groupName}).then(function(res){
                if(res.status == 200){
                    localStorage['gameSession'] = res.data;
                    $scope.game.running = true;
                    $rootScope.$broadcast('fetchState');
                }else {
                   console.log(res);
                }
            });
        };
        $scope.endGame = function(){
            $http.delete('/api/game/sessions/' + localStorage['gameSession']).then(function(res){
                localStorage.removeItem('gameSession');
                $scope.game.running = false;
            });
        };
    }
})();