(function(){
    var api = angular.module('api',['ngResource']);

    api.service('locationApi', function($resource) {
        return $resource('/api/admin/locations/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('riddleApi', function($resource) {
        return $resource('/api/admin/riddles/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('tagApi', function($resource) {
        return $resource('/api/admin/tags/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('loginApi', function($resource) {
        return $resource('/api/admin/session/:id', { id: '@_id' });
    });

    api.service('sessionApi', function($resource) {
        return $resource('/api/admin/playsessions/:id', { id: '@_id' });
    });

    api.service('configApi', function($resource) {
        return $resource('/api/admin/config/:id', { id: '@_id' });
    });
})();

