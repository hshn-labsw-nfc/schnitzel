(function () {
    var app = angular.module('auth', []);

    app.factory('auth', authFactory);



    function authFactory($http, $rootScope) {
        $scope.$on('logout', logout);

        var token = null;

        function isLoggedIn() {
            return token != null;
        }

        function login(user, password) {
            $http.post('/api/admin/session/').success(function (res) {
                token = res;
                $http.defaults.headers.common['X-Auth-Token'] = token;
            }).error(function () {
                // Some errorhandling
            });
        }

        function logout() {
            if (isLoggedIn()) {
                $http.delete('/api/admin/session/' + token).then(function () {
                    token = null;
                    $http.defaults.headers.common['X-Auth-Token'] = undefined;
                    location.hash = '/';
                });
            }
        }

        return {
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout
        }
    }

    app.factory('AuthInterceptor', function ($rootScope, $q) {
        return {
            responseError: function (response) {
                if([401, 403].indexOf(response.status) != -1) {
                    $rootScope.$broadcast('logout');
                    return $q.reject(response);
                }
            }
        };
    });
})();

