(function () {
    var app = angular.module('login', ['ui.bootstrap', 'api', 'auth']);

    app.controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, loginApi, auth) {

        if(auth.isLoggedIn()){
            location.hash = '/liststatuss';
        }

        $scope.login = function () {
            auth.login($scope.username,$scope.password, function(err){
                if(err){

                }else{
                    location.hash = '/liststatuss';
                }
            });
        }
    }

})();