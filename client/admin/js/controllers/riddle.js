(function () {
    var app = angular.module('riddle', ['ui.bootstrap','api']);

    app.controller('RiddleListCtrl', RiddleListCtrl);
    app.controller('RiddleAddCtrl', RiddleAddCtrl);

    function RiddleAddCtrl($scope) {
        $scope.riddle = {
            state: "general",
            name: 'Hinzufügen eines Rätsels',
            general: 'Größerer Ort',
            room: 'Vorlesungsraum'
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
    }


})();