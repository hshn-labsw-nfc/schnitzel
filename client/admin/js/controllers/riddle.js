(function () {
    var app = angular.module('riddle', ['ui.bootstrap','api']);

    app.controller('RiddleListCtrl', RiddleListCtrl);
    app.controller('RiddleEntryCtrl', RiddleEntryCtrl);

    function RiddleEntryCtrl($scope) {
        $scope.heading = 'Hinzufügen eines Rätsels'
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
    }


})();