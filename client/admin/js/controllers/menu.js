(function () {
    var app = angular.module('controllers');

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = [
            'Orte', 'Rätsel', 'Tags'
        ];
    }
})();