(function () {
    var app = angular.module('controllers');

    app.controller('LocationListCtrl', LocationListCtrl);

    function LocationListCtrl($scope){
        $scope.name = 'Locationlist';
    }
})();