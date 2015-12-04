(function () {
    var app = angular.module('config', ['ui.bootstrap', 'api']);

    app.controller('ConfigCtrl', ConfigCtrl);

    function ConfigCtrl($scope,$http) {

        $scope.saveEndText = function () {
            $http.put('/api/admin/config',{config: $scope.config}).success(function (res) {
                console.log(res);
            }).error(function (err) {
                console.log("ERROR", err);
            })
        };

        $scope.saveUserConfig = function (){

        };
        
    };

})();