/**
 * Created by Yannic on 12/1/2015.
 */

(function () {
    var app = angular.module('modal', ['ui.bootstrap', 'api']);

    app.controller('ModalCtrl', ModalCtrl);


    function ModalCtrl($scope, $uibModalInstance, message, functionToExecute, parameter) {
        $scope.header = message['header'];
        $scope.body = message['text'];
        $scope.ok = function () {
            functionToExecute(parameter);
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
