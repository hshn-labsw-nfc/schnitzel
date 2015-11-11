(function () {
    var app = angular.module('tag', ['ui.bootstrap', 'api']);

    app.controller('TagListCtrl', TagListCtrl);
    app.controller('TagEntryCtrl', TagEntryCtrl);

    function TagEntryCtrl($scope) {
        $scope.heading = 'Hinzufügen eines Tags';
    }

    function TagListCtrl($scope, tagApi){
        $scope.name = 'Tag';
        $scope.entity = 'tag';

        $scope.tableheaders = {
            _id: 'ID',
            alias: 'Alias'
        };

        tagApi.query((function(data){
            console.log(data);
            $scope.data = data;
        }));

        $scope.delete = function(id) {
            console.log("try to delete"+id);
            //TODO connect with database
        }
    }

})();