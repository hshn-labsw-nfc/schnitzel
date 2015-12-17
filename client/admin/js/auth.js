(function () {
    var app = angular.module('auth', []);

    app.factory('auth', authFactory);



    function authFactory($http, $rootScope) {
        $rootScope.$on('logout', logout);

        var token = null;

        if(localStorage['admintoken']){
            setToken(localStorage['admintoken']);
        }

        function isLoggedIn() {
            return token && token != null;
        }

        function login(user, password, callback) {
            callback = callback || function(){};
            $http.post('/api/admin/session/', {username: user, password: password}).success(function (res) {
                setToken(res.token);
                callback();
            }).error(function (err) {
                callback(err);
            });
        }

        function setToken(t){
            token = t;
            localStorage['admintoken'] = t;
            $http.defaults.headers.common['X-Auth-Token'] = t;
            $rootScope.$broadcast('login');
        }

        function logout() {
            console.log('logout');
            if (isLoggedIn()) {
                $http.delete('/api/admin/session/' + token);
                token = null;
                $http.defaults.headers.common['X-Auth-Token'] = undefined;
                localStorage.removeItem('admintoken');
            }
            location.hash = '/login';
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
                if(response.status == 401) {
                    console.log('got 401');
                    $rootScope.$broadcast('logout');
                    return $q.reject(response);
                }
            }
        };
    });
})();

