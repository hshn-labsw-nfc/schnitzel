/**
 * Created by Yannic on 12/1/2015.
 */

(function () {
    var app = angular.module('modal', ['ui.bootstrap', 'api']);

    app.controller('ModalCtrl', ModalCtrl);


    function ModalCtrl($scope, locationApi, $uibModalInstance, id, loadEntries) {
        $scope.ok = function () {
            locationApi.delete({id:id});
            loadEntries();
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
