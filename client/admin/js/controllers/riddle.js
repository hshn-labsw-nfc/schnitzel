(function () {
    var app = angular.module('riddle', ['ui.bootstrap','api', 'modal']);

    app.controller('RiddleListCtrl', RiddleListCtrl);
    app.controller('RiddleEntryCtrl', ['$scope', '$routeParams', 'riddleApi', 'locationApi', RiddleEntryCtrl]);

    function RiddleEntryCtrl($scope, $routeParams, riddleApi, locationApi) {
        $scope.data = {};
        $scope.locations = {};

        locationApi.query((function(data){
            console.log(data);
            $scope.locations = data;
        }));

        if($routeParams.id){
            $scope.heading = 'Editieren eines Rätsels';
            riddleApi.get({id:$routeParams.id},function(data){
                $scope.data = data;
            });
        }else{
            $scope.heading = 'Hinzufügen eines Rätsels';
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

    function RiddleListCtrl($scope, riddleApi, $uibModal){
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
        };
        loadEntries();

        $scope.animationsEnabled = true;
        $scope.open = function (id) {
            $scope.id = id;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'templates/modal/confirm_delete_modal.html',
                controller: 'ModalCtrl',
                resolve: {
                    message: function() {
                        $scope.message = {
                            header: 'Delete riddle',
                            text: 'Are you sure to delete this riddle'
                        };
                        return $scope.message;
                    },
                    functionToExecute: function() {
                        return  $scope.delete;
                    },
                    parameter: function () {
                        return id;
                    }
                }
            });
        };
        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    }


})();