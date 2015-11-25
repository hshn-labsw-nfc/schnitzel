(function () {
    var app = angular.module('schnitzelApp', [
        'ngRoute'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.
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