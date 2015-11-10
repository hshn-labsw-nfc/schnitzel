(function(){
    var api = angular.module('api',['ngResource']);

    api.service('locationApi', function($resource) {
        return $resource("/api/locations/:id");
    });

    api.service('riddleApi', function($resource) {
        return $resource("/api/riddles/:id");
    });

    api.service('tagApi', function($resource) {
        return $resource("/api/tag/:id");
    });
})();

