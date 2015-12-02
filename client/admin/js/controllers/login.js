(function () {
    var app = angular.module('login', ['ui.bootstrap', 'api']);

    app.controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, loginApi) {

        $scope.login = function () {
            var session = {
                user: $scope.username,
                password: $scope.password
            };
            console.log(session);
            loginApi.save(session).$promise
                .then(function (response) {
                console.log(response);
                    alert('success');
                })
                .catch(function (response) {
                    console.log('ERROR', response);
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                });
        }
    }

})();