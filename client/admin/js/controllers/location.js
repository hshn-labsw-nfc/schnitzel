(function () {
    var app = angular.module('location', ['ui.bootstrap', 'api', 'modal']);

    app.controller('LocationListCtrl', LocationListCtrl);
    app.controller('LocationEntryCtrl', LocationEntryCtrl);

    function LocationEntryCtrl($scope, $routeParams, locationApi, tagApi) {

        $scope.data = {};
        if ($routeParams.id) {
            $scope.heading = 'Location Bearbeiten';
            $scope.data = locationApi.get({id: $routeParams.id});
        } else {
            $scope.heading = 'Hinzufügen einer Location';
        }

        $scope.location = {
            category: 'general',
            general: 'Allgemein',
            room: 'Vorlesungsraum'
        };

        $scope.save = function (){
            console.log('DATA TO SAVE');
            console.log($scope.data);
            if($routeParams.id){
                $scope.data.$update(function () {
                    location.href = '#/listlocations';
                });
            } else {
                locationApi.save($scope.data, function () {
                    location.href = '#/listlocations';
                });
            }
        }
    }

    function LocationListCtrl($scope, locationApi, $uibModal, ModalCtrl){
        console.log(locationApi.query());
        $scope.entity = 'location';
        $scope.name = 'Ort';
        $scope.tableheaders = {
            isActive: 'Aktiv?',
            room: 'Raumnummer',
            name: 'Raumname',
            description: 'Beschreibung'
        };
        $scope.loadEntries = function(){
            locationApi.query((function(data){
            console.log(data);
            $scope.data = data;
        }));};


        $scope.loadEntries();


        $scope.animationsEnabled = true;
        $scope.open = function (id) {
            $scope.id = id;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'templates/modal/confirm_delete_modal.html',
                controller: 'ModalCtrl',
                resolve: {
                    loadEntries: function() {
                       return  $scope.loadEntries;
                    },
                    id: function () {
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