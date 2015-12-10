/**
 * Created by Yannic on 12/1/2015.
 */

(function () {
    var app = angular.module('modal', ['ui.bootstrap']);

    app.controller('ModalCtrl', ModalCtrl);


    function ModalCtrl($scope, $uibModalInstance, message, callback) {
        $scope.header = message['header'];
        $scope.body = message['text'];
        $scope.confirmButtonText = message['confirmButtonText'];
        $scope.cancelButtonText = message['cancelButtonText'];
        $scope.ok = function () {
            callback(true);
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            callback(false);
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
