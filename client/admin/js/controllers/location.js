(function () {
    var app = angular.module('location', ['ui.bootstrap']);

    app.controller('LocationListCtrl', LocationListCtrl);
    app.controller('LocationAddCtrl', LocationAddCtrl);

    function LocationAddCtrl($scope) {
        $scope.location = {
            state: "general",
            name: 'Hinzufügen einer Location',
            general: 'Allgemein',
            room: 'Vorlesungsraum',
            tags: {1: 'tagA106', 2: 'tagMensa'},
            selectedTag: null
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
                _id: 0,
                room: 'A105',
                name: 'Labor',
                description: 'das ist ne beschreibung'
            },
            {
                _id: 1,
                room: 'A106',
                name: 'Labor',
                description: 'das ist ne andere beschreibung'
            }
        ];
    }

})();