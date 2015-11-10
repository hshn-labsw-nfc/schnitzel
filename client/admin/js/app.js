(function () {
    var app = angular.module('schnitzelAdmin', [
        'ngRoute', 'menu', 'location', 'riddle'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.
        when('/listriddles', {
            templateUrl: 'templates/listview.html',
            controller: 'RiddleListCtrl'
        }).
        when('/addriddle', {
            templateUrl: 'templates/riddleform.html',
            controller: 'RiddleAddCtrl'
        }).
        when('/editriddle/:id', {
            templateUrl: 'templates/riddleform.html',
            controller: 'RiddleEditCtrl'
        }).
        when('/listlocations', {
            templateUrl: 'templates/listview.html',
            controller: 'LocationListCtrl'
        }).
        when('/addlocation', {
            templateUrl: 'templates/locationform.html',
            controller: 'LocationAddCtrl'
        }).
        when('/editlocation/:id', {
            templateUrl: 'templates/locationform.html',
            controller: 'LocationEditCtrl'
        }).
        when('/', {
            templateUrl: 'templates/overview.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }

})();