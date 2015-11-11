(function () {
    var app = angular.module('tag', ['ui.bootstrap', 'api']);

    app.controller('TagListCtrl', TagListCtrl);
    app.controller('TagAddCtrl', TagAddCtrl);

    function TagAddCtrl($scope) {
        $scope.riddle = {
            state: "general",
            name: 'Hinzufügen eines Tags'
        }
    }

    function TagListCtrl($scope, tagApi){
        $scope.name = 'Tag';

        tagApi.query((function(data){
            console.log(data);
            $scope.data = data;
        }));
    }

})();