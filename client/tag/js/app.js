(function () {
    var app = angular.module('schnitzelApp', [
        'ngRoute'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.

        when('/start', {
            templateUrl: 'templates/start.html',
            controller: 'StartCtrl'
        }).
        when('/tag/:id', {
            templateUrl: 'templates/tag.html',
            controller: 'TagCtrl'
        }).
        when('/', {
            templateUrl: 'templates/error.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }

})();