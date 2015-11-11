(function () {
    var app = angular.module('riddle', ['ui.bootstrap','api']);

    app.controller('RiddleListCtrl', RiddleListCtrl);
    app.controller('RiddleEntryCtrl', ['$scope', '$routeParams', 'riddleApi', RiddleEntryCtrl]);

    function RiddleEntryCtrl($scope, $routeParams, riddleApi) {
        $scope.data = {};
        if($routeParams.id){
            $scope.heading = 'Editieren eines Rätsels'
            riddleApi.get({id:$routeParams.id},function(data){
                $scope.data = data;
            });
        }else{
            $scope.heading = 'Hinzufügen eines Rätsels'
        }

        $scope.save = function (){
            if($routeParams.id){
                $scope.data.$update(function () {
                    location.href = '#/listriddles';
                });
            } else {
                riddleApi.save($scope.data, function () {
                    location.href = '#/listriddles';
                });
            }
        }
    }

    function RiddleListCtrl($scope, riddleApi){
        $scope.name = 'Rätsel';
        $scope.entity = 'riddle';
        $scope.tableheaders = {
            name: 'Rätselname',
            description: 'Beschreibung'
        };
        function loadEntries(){
            riddleApi.query((function(data){
                console.log(data);
                $scope.data = data;
            }));}

        $scope.delete = function(id) {
            riddleApi.delete({id:id});
            loadEntries();
        }
        loadEntries();
    }


})();