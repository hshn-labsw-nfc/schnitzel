(function () {
    var app = angular.module('schnitzelApp');

    app.controller('TagCtrl', TagCtrl);

    function TagCtrl($scope, $routeParams, $http, $rootScope) {
        var tagID = $routeParams.tagID;

        if($scope.game.running){
            $http.post('/api/game/sessions/' + $scope.game.sessionID + '/location', {tagID: tagID}).then(function(res){
                if(res.status == 200){// {correctLocation: true}
                    if(res.data.correctLocation){
                        $rootScope.$broadcast('alert', 'Raum gefunden', 'success');
                    }else{
                        $rootScope.$broadcast('alert', 'Das ist der falsche Raum!', 'danger');
                    }
                    $rootScope.$broadcast('fetchState');
                }else{
                    $rootScope.$broadcast('alert', 'The server didn\'t respond, Please reload the page to try again', 'danger');
                }
            });
        }else{
            location.hash = '/';
        }
    }

})();