(function () {
    var app = angular.module('config', ['ui.bootstrap', 'api']);

    app.controller('ConfigCtrl', ConfigCtrl);

    function ConfigCtrl($scope,configApi) {

        $scope.heading = 'Config';

        $scope.entity = 'config';
        $scope.name = 'Ort';

        $scope.saveEndText = function () {

        };

        $scope.saveUserConfig = function (){

        };
        
    };

})();