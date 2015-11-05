(function () {
    var app = angular.module('location', ['ui.bootstrap']);

    app.controller('LocationListCtrl', LocationListCtrl);
    app.controller('LocationAddCtrl', LocationAddCtrl);

    function LocationAddCtrl($scope) {
        $scope.location = {
            state: "general",
            name: 'Hinzufügen einer Location',
            general: 'Allgemein',
            room: 'Vorlesungsraum'
        }
    }

    function LocationListCtrl($scope){
        $scope.name = 'Orte';
    }
})();