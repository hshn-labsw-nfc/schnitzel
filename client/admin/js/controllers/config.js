(function () {
    var app = angular.module('config', ['ui.bootstrap', 'api']);

    app.controller('ConfigCtrl', ConfigCtrl);



    function ConfigCtrl($scope,$http) {
        $scope.config = {};
        $scope.user = {};
        $scope.password = {};

        function loadEntries(){
            $http.get('/api/admin/config/winText').success(function (res){
                 $scope.config.winText = res;
            }).error(function (err) {
                console.log("ERROR", err);
            })

            $http.get('/api/admin/config/username').success(function (res){
                $scope.user.username = res;
            }).error(function (err) {
                console.log("ERROR", err);
            })
        }

        $scope.changeEndText = function () {
            console.log($scope.config);
            $http.put('/api/admin/config/winText',$scope.config).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
        })
        };

        $scope.changeUserName = function (){
            $http.put('/api/admin/config/username',$scope.user).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
            })
        };

        $scope.changePassword = function (){
            if($scope.password.password == $scope.password.passwordRepeat){
                $scope.error = "";
                $http.put('/api/admin/config/password',$scope.password).success(function (res) {
                    console.log(res);
                }).error(function (err) {
                    console.log("ERROR", err);
                })
            } else {
                $scope.error = "Passwörter sind unterschiedlich!";
            }
        };
        loadEntries();
    };



})();