(function () {
    var app = angular.module('config', ['ui.bootstrap', 'api']);

    app.controller('ConfigCtrl', ConfigCtrl);



    function ConfigCtrl($scope,$http) {

        $scope.changeEndText = function () {

            if($scope.user.newPassword )
            $http.put('/api/admin/config',{config: $scope.config}).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
        })
        };

        $scope.changeUserName = function (){
            $http.put('/api/admin/config',{user: $scope.user}).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
            })
        };

        $scope.changePassword = function (){
            $http.put('/api/admin/config',{password: $scope.password}).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
            })
        };

    };



})();