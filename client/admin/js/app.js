(function () {
    var app = angular.module('schnitzelAdmin', [
        'ngRoute', 'menu', 'location'
    ]);

    app.config(['$routeProvider',routeProvider]);

    function routeProvider($routeProvider){
        $routeProvider.
        when('/listlocations', {
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

})();