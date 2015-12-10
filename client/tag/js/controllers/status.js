(function () {
    var app = angular.module('schnitzelApp');

    app.controller('StatusCtrl', StatusCtrl);


    function StatusCtrl($scope, $http, $rootScope, $uibModal) {
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

        $scope.animationsEnabled = true;
        $scope.ok = function (id) {
            $scope.id = id;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '../shared/templates/modal/confirm_delete_modal.html',
                controller: 'ModalCtrl',
                resolve: {
                    message: function() {
                        $scope.message = {

                            header: 'Schnitzeljagd Beenden',
                            text: 'Wirklich Schnitzeljagd beenden?',
                            confirmButtonText: 'Beenden',
                            cancelButtonText: 'Abbrechen'
                        };
                        return $scope.message;
                    },
                    callback: function() {
                        return function (success) {
                            if(success) {
                                $scope.endGame();
                            }
                        };
                    },
                    parameter: function () {
                        return id;
                    }
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