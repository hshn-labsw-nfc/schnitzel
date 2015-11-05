(function () {
    var app = angular.module('schnitzelAdmin', [
        'ngRoute'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.
        when('/locationlist', {
            templateUrl: 'templates/locationlist.html'
        }).
        when('/', {
            templateUrl: 'templates/overview.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
})();