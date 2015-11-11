(function () {
    var app = angular.module('location', ['ui.bootstrap', 'api']);

    app.controller('LocationListCtrl', LocationListCtrl);
    app.controller('LocationAddCtrl', LocationAddCtrl);

    function LocationAddCtrl($scope, $routeParams, locationApi, tagApi) {
        if ($routeParams.id) {
            $scope.heading = 'Location Bearbeiten';
        } else {
            $scope.heading = 'Hinzufügen einer Location';
        }
        $scope.location = {
            state: "general",
            general: 'Allgemein',
            room: 'Vorlesungsraum',
            selectedTag: null
        };
        $scope.data = locationApi.get({id: $routeParams.id});
        console.log($scope.data);
        tagApi.query((function (data) {
            console.log(data);
            $scope.tags = data;
        }));
    }

    function LocationListCtrl($scope, locationApi){
        console.log(locationApi.query());
        $scope.entity = 'location';
        $scope.name = 'Orte';
        $scope.tableheaders = {
            room: 'Raumnummer',
            name: 'Raumname',
            description: 'Beschreibung'
        };
        locationApi.query((function(data){
            console.log(data);
            $scope.data = data;
        }));
        $scope.delete = function (id) {
            console.log('delete function called '+id);
        }
    }

})();