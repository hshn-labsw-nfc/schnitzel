(function () {
    var app = angular.module('config', ['ui.bootstrap', 'api']);

    app.controller('ConfigCtrl', ConfigCtrl);



    function ConfigCtrl($scope,$http) {

        $scope.changeEndText = function () {
            console.log($scope.config);
            $http.put('/api/admin/config/winText',$scope.config).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
        })
        };

        $scope.changeUserName = function (){
            $http.put('/api/admin/config/',$scope.user).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
            })
        };

        $scope.changePassword = function (){
            if($scope.password.newPassword == $scope.password.newPasswordRepeat){
                $scope.error = "";
                $http.put('/api/admin/config',$scope.password).success(function (res) {
                    console.log(res);
                }).error(function (err) {
                    console.log("ERROR", err);
                })
            } else {
                $scope.error = "Passwörter sind unterschiedlich!";
            }
        };

    };



})();