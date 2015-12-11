(function () {
    var app = angular.module('tag', ['ui.bootstrap', 'api', 'modal']);

    app.controller('TagListCtrl', TagListCtrl);
    app.controller('TagEntryCtrl', ['$scope', '$routeParams', 'tagApi','locationApi', TagEntryCtrl]);

    function TagEntryCtrl($scope, $routeParams, tagApi, locationApi) {
        $scope.data = {};
        if($routeParams.id){
            $scope.heading = 'Editieren eines Tags';
            tagApi.get({id:$routeParams.id},function(data){
                $scope.data = data;
            });
        }else{
            $scope.heading = 'Hinzufügen eines Tags';

        }

        locationApi.query((function (data) {
            console.log(data);
            $scope.locations = data;
        }));

        $scope.save = function () {
            console.log($scope.data);
            if($routeParams.id){
                $scope.data.$update(function () {
                    location.href = '#/listtags';
                });
            } else {
                tagApi.save($scope.data, function () {
                    location.href = '#/listtags';
                });
            }

        }
    }

    function TagListCtrl($scope, tagApi, $uibModal){
        $scope.name = 'Tag';
        $scope.entity = 'tag';

        //TODO warum benutzen wir nich einfach die tag._id als TagID?
        $scope.tableheaders = {
            tagID: 'TagID',
            alias: 'Alias'
        };

        function loadEntries(){
            tagApi.query((function(data){
                console.log(data);
                $scope.data = data;
            }));}

        $scope.delete = function(id) {
            tagApi.delete({id:id});
            loadEntries();
        };
        loadEntries();

        $scope.animationsEnabled = true;
        $scope.ok = function (id) {
            $scope.id = id;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '../shared/templates/modal/confirm_delete_modal.html',
                controller: 'ModalCtrl',
                resolve: {
                    message: function() {
                        $scope.message = {
                            header: 'Tag löschen',
                            text: 'Diesen Tag wirklich löschen?',
                            confirmButtonText: 'Löschen',
                            cancelButtonText: 'Abbrechen'
                        };
                        return $scope.message;
                    },
                    callback: function() {
                        return function (success) {
                            if(success) {
                                $scope.delete(id);
                            }
                        };
                    },
                    parameter: function () {
                        return id;
                    }
                }
            });
        };
        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }

})();