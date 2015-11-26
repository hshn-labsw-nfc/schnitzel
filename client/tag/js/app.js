(function () {
    var app = angular.module('schnitzelApp', [
        'ngRoute', 'ui.bootstrap'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.
        when('/winner', {
            templateUrl: 'templates/winner.html',
            controller: 'WinnerCtrl'
        }).
        when('/:tagID', {
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