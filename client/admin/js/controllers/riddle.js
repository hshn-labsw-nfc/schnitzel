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
            console.log($scope.data);
            riddleApi.save($scope.data,function(){
                location.href='#/listriddles';
            });

        }
    }

    function RiddleListCtrl($scope, riddleApi){
        $scope.name = 'Rätsel';
        $scope.entity = 'riddle';
        $scope.tableheaders = {
            name: 'Rätselname',
            description: 'Beschreibung'
        };
        riddleApi.query((function(data){
            console.log(data);
            $scope.data = data;
        }));

        $scope.delete = function(id) {
            console.log("try to delete"+id);
            //TODO connect with database
        }
    }


})();