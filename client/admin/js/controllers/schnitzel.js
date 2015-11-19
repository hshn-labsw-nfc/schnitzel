/**
 * Created by Shonu on 16.11.2015.
 */
(function () {
    var app = angular.module('schnitzel', ['ui.bootstrap', 'api']);

    app.controller('SchnitzelEntryCtrl', SchnitzelEntryCtrl);

    function SchnitzelEntryCtrl($scope, tagApi, schnitzelApi) {
        $scope.heading = 'Festlegen des Start-Tags';
/*
        schnitzelApi.get({id:1},function(data){
            $scope.data = data;
        });
*/
        if($scope.data == null){
            $scope.data = {id: 1};
        }

        tagApi.query((function (data) {
            console.log(data);
            $scope.tags = data;
        }));

        $scope.save = function () {
            console.log($scope.data);
            console.log($routeParams.id);
            schnitzelApi.save($scope.data, function () {
                alert("Speichern erfolgreich")
            });
        }
    }
})();