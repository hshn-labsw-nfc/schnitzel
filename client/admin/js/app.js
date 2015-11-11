(function () {
    var app = angular.module('schnitzelAdmin', [
        'ngRoute', 'menu', 'location', 'riddle', 'tag'
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
            controller: 'RiddleEntryCtrl'
        }).
        when('/editriddle/:id', {
            templateUrl: 'templates/riddleform.html',
            controller: 'RiddleEntryCtrl'
        }).
        when('/listlocations', {
            templateUrl: 'templates/listview.html',
            controller: 'LocationListCtrl'
        }).
        when('/addlocation', {
            templateUrl: 'templates/locationform.html',
            controller: 'LocationAddCtrl'
        }).
        when('/addlocation/:id', {
            templateUrl: 'templates/locationform.html',
            controller: 'LocationAddCtrl'
        }).
        when('/editlocation/:id', {
            templateUrl: 'templates/locationform.html',
            controller: 'LocationEditCtrl'
        }).
        when('/listtags', {
            templateUrl: 'templates/listview.html',
            controller: 'LocationListCtrl'
        }).
        when('/addtag', {
            templateUrl: 'templates/tagform.html',
            controller: 'TagAddCtrl'
        }).
        when('/edittg/:id', {
            templateUrl: 'templates/tgform.html',
            controller: 'TagEditCtrl'
        }).
        when('/', {
            templateUrl: 'templates/overview.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }

})();