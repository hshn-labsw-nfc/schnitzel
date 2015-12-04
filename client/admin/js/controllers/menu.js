(function () {
    var app = angular.module('menu', []);

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = {
            status: 'Status',
            config: 'Config',
            location:'Orte',
            riddle:'Rätsel',
            tag:'Tags'
        };
    }
})();