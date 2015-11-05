(function () {
    var app = angular.module('controllers');

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = {
            location:'Orte',
            riddles:'Rätsel',
            tags:'Tags'
        };
    }
})();