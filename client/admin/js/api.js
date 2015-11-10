(function(){
    var api = angular.module('api',['ngResource']);

    api.service('locationApi', function($resource) {
        return $resource("/api/locations/:id");
    });
})();