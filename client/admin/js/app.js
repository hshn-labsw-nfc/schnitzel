(function () {
    var app = angular.module('schnitzelAdmin', [
        'ngRoute', 'controllers'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.
        when('/locationlist', {
            templateUrl: 'templates/listview.html',
            controller: 'LocationListCtrl'
        }).
        when('/', {
            templateUrl: 'templates/overview.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }

    // initializing modules
    angular.module('controllers', []);
})();