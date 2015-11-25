(function () {
    var app = angular.module('schnitzelApp');

    app.controller('TagCtrl', TagCtrl);

    function TagCtrl($scope, $routeParams, $http, $rootScope) {
        var tagID = $routeParams.tagID;

        if($scope.game.running){
            console.log('/api/game/location/' + $scope.game.sessionID);
            $http.post('/api/game/location/' + $scope.game.sessionID, {tagID: tagID}).then(function(res){
                if(res.status == 200){
                    if(res.data.correctLocation){
                        $rootScope.$broadcast('fetchState');
                    }else{
                        $rootScope.$broadcast('alert', 'Das ist der falsche Raum!');
                        location.hash = '/';
                    }
                }else{

                }
            });
        }else{
            // Show the normal stuff
        }

    }

})();