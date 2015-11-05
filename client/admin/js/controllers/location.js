(function () {
    var app = angular.module('location', []);

    app.controller('LocationListCtrl', LocationListCtrl);

    function LocationListCtrl($scope){
        $scope.name = 'Orte';
    }
})();