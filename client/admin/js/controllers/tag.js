(function () {
    var app = angular.module('tag', ['ui.bootstrap']);

    app.controller('TagListCtrl', TagListCtrl);
    app.controller('TagAddCtrl', TagAddCtrl);

    function TagAddCtrl($scope) {
        $scope.riddle = {
            state: "general",
            name: 'Hinzufügen eines Tags'
        }
    }

    function TagListCtrl($scope){
        $scope.name = 'Tag';
    }
})();