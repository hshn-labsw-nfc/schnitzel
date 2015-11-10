(function () {
    var app = angular.module('riddle', ['ui.bootstrap']);

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

    function RiddleListCtrl($scope){
        $scope.name = 'Rätsel';
    }

    riddleApi.query((function(data){
        console.log(data);
        $scope.data = data;
    }));
})();