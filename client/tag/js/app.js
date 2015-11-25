(function () {
    var app = angular.module('schnitzelApp', [
        'ngRoute'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.
        when('/:id', {
            templateUrl: 'templates/tag.html',
            controller: 'TagCtrl'
        }).
        when('/', {
            templateUrl: 'templates/status.html',
            controller: 'StatusCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }

})();