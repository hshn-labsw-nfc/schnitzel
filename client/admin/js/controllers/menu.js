(function () {
    var app = angular.module('menu', []);

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = {
            location:'Orte',
            riddles:'Rätsel',
            tags:'Tags'
        };
    }
})();