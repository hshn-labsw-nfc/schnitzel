(function () {
    var app = angular.module('tag', ['ui.bootstrap', 'api']);

    app.controller('TagListCtrl', TagListCtrl);
    app.controller('TagEntryCtrl', ['$scope', '$routeParams', 'tagApi', TagEntryCtrl]);

    function TagEntryCtrl($scope, $routeParams, tagApi) {
        $scope.data = {};
        if($routeParams.id){
            $scope.heading = 'Editieren eines Tags'
            tagApi.get({id:$routeParams.id},function(data){
                $scope.data = data;
            });
        }else{
            $scope.heading = 'Hinzufügen eines Tags';
        }
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