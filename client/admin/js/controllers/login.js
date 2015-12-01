(function () {
    var app = angular.module('login', ['ui.bootstrap', 'api']);

    app.controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, loginApi){

        $scope.login = function (){

            loginApi.save($scope.username, $scope.password, function(response) {
                if(response.success) {
                    alert('success');

                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        }
    }

})();