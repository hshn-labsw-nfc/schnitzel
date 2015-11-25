(function () {
    var app = angular.module('schnitzelApp');

    app.controller('RiddleCtrl', RiddleCtrl);


    function RiddleCtrl($scope, $http, $rootScope) {
        $scope.riddle = {};
        $scope.solve = function(){
            console.log('clicked solvebutton');
            console.log($scope.riddle.answer);
            $http.post('/api/game/solve/'+$scope.game.sessionID, {answer: $scope.riddle.answer}).then(function(res){
                if(res.status == 200){
                    if(res.data.answerWasRight){
                        console.log('Right answer !!!');
                        $rootScope.$broadcast('fetchState');
                    }else{
                        console.log('Wrong answer !');
                    }
                }else {
                    // TODO: Errorhandling
                }
            });
        };
    }
})();