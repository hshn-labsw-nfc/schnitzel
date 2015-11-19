/**
 * Created by Shonu on 16.11.2015.
 */
(function () {
    var app = angular.module('schnitzel', ['ui.bootstrap', 'api']);

    app.controller('SchnitzelEntryCtrl', SchnitzelEntryCtrl);

    function SchnitzelEntryCtrl($scope, tagApi, schnitzelApi) {
        $scope.heading = 'Festlegen des Start-Tags';

        schnitzelApi.query(function(data){
            if(data.length < 1){
                $scope.data = {};
            }else{
                $scope.data = data[0];
            }
        });

        tagApi.query((function (data) {
            console.log(data);
            $scope.tags = data;
        }));

        $scope.save = function () {
            console.log($scope.data);
            schnitzelApi.save($scope.data, function () {
                alert("Speichern erfolgreich")
            });
        }
    }
})();