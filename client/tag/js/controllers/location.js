(function () {
    var app = angular.module('location', ['ui.bootstrap', 'api']);

    app.controller('LocationListCtrl', LocationEntryCtrl);

    function LocationEntryCtrl($scope, locationApi, $routeParams){
        console.log(locationApi.query());
        $scope.data = locationApi.get({id: $routeParams.id});
    }

})();