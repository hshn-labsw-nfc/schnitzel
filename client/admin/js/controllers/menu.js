(function () {
    var app = angular.module('menu', []);

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = {
            location:'Orte',
            riddle:'Rätsel',
            tag:'Tags',
            status: 'Schnitzeljagd Status'
        };
    }
})();