(function(){
    var api = angular.module('api',['ngResource']);

    api.factory('Entry', function($resource) {
        return $resource('/api/entries/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('locationApi', function($resource) {
        return $resource('/api/locations/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('riddleApi', function($resource) {
        return $resource('/api/riddles/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });
})();
