(function () {
    var app = angular.module('tag', ['ui.bootstrap', 'api']);

    app.controller('TagListCtrl', TagListCtrl);
    app.controller('TagEntryCtrl', ['$scope', '$routeParams', 'tagApi', TagEntryCtrl]);

    function TagEntryCtrl($scope, $routeParams, tagApi) {
        $scope.data = {};
        if($routeParams.id){
            $scope.heading = 'Editieren eines Tags';
            tagApi.get({id:$routeParams.id},function(data){
                $scope.data = data;
            });
        }else{
            $scope.heading = 'Hinzufügen eines Tags';

        }

        $scope.save = function () {
            console.log($scope.data);
            if($routeParams.id){
                $scope.data.$update(function () {
                    location.href = '#/listtags';
                });
            } else {
                tagApi.save($scope.data, function () {
                    location.href = '#/listtags';
                });
            }

        }
    }

    function TagListCtrl($scope, tagApi){
        $scope.name = 'Tag';
        $scope.entity = 'tag';

        $scope.tableheaders = {
            tagID: 'TagID',
            alias: 'Alias'
        };

        function loadEntries(){
            tagApi.query((function(data){
                console.log(data);
                $scope.data = data;
            }));}

        $scope.delete = function(id) {
            tagApi.delete({id:id});
            loadEntries();
        }
        loadEntries();
    }

})();