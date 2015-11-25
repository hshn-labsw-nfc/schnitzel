(function () {
    var app = angular.module('schnitzelApp');

    app.controller('TagCtrl', TagCtrl);

    function TagCtrl($scope, $routeParams, $http) {
        var tagID = $routeParams.tagID;

        if($scope.game.running){
            console.log('/api/game/location/' + $scope.game.sessionID);
            $http.post('/api/game/location/' + $scope.game.sessionID, {tagID: tagID}).then(function(res){
                if(res.status == 200){
                    console.log(res.data);
                }else{

                }
            });
        }else{
            // Show the normal stuff
        }

    }

})();