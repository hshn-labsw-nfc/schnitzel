/**
 * Created by Shonu on 16.11.2015.
 */
(function () {
    var app = angular.module('schnitzel', ['ui.bootstrap', 'api']);

    app.controller('SchnitzelEntryCtrl', SchnitzelEntryCtrl);

    function SchnitzelEntryCtrl($scope, $routeParams, tagApi) {
        $scope.heading = 'Festlegen des Start-Tags';
        $scope.data = {};
        tagApi.query((function (data) {
            console.log(data);
            $scope.tags = data;
        }));

        $scope.save = function () {
            console.log($scope.data);
            console.log($routeParams.id);
        }
    }
})();