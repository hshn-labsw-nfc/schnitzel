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
        $scope.entity = 'location';
        $scope.name = 'Orte';
        $scope.tableheaders = {
            room: 'Raumnummer',
            name: 'Raumname',
            description: 'Beschreibung'
        };
        $scope.data = [
            {
                room: 'A105',
                name: 'Labor',
                description: 'das ist ne beschreibung'
            },
            {
                room: 'A106',
                name: 'Labor',
                description: 'das ist ne andere beschreibung'
            }
        ];
    }

})();