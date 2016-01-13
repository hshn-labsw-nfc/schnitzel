(function () {
    var app = angular.module('location', ['ui.bootstrap', 'api', 'modal']);

    app.controller('LocationListCtrl', LocationListCtrl);
    app.controller('LocationEntryCtrl', LocationEntryCtrl);

    function LocationEntryCtrl($scope, $routeParams, locationApi, $uibModal) {

        $scope.data = {};
        if ($routeParams.id) {
            $scope.heading = 'Editieren eines Ortes';
            locationApi.get({id: $routeParams.id}, function (resp, headers) {
                console.log(resp);
                $scope.data = resp;
            });

        } else {
            $scope.heading = 'Hinzufügen eines Ortes';
        }

        $scope.save = function (){
            if($routeParams.id){
                $scope.data.$update(function (resp, headers) {

                    console.log("resp",resp);
                    console.log("headers",headers);

                    if(resp.errmsg){
                        openModal();
                        $scope.data = locationApi.get({id: $routeParams.id});
                        console.log("error",resp.errmsg);
                    }else{
                        location.href = '#/listlocations';
                    }

                }, function (err) {
                    console.log(err);
                });
            } else {
                locationApi.save($scope.data, function (resp, headers) {

                    if(resp.errmsg){
                        openModal();
                        console.log("error",resp.errmsg);
                    }else{
                        location.href = '#/listlocations';
                    }
                });
            }
        }

        $scope.animationsEnabled = true;

        function openModal (id) {
            $scope.id = id;

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '../shared/templates/modal/confirm_modal.html',
                controller: 'ModalCtrl',
                resolve: {
                    message: function() {
                        $scope.message = {
                            header: 'Fehler',
                            text: 'Doppelte Raumnamen sind nicht möglich.',
                        };
                        return $scope.message;
                    },
                    callback: function() {
                        return function (success) {
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

    function LocationListCtrl($scope, locationApi, $uibModal){
        console.log(locationApi.query());
        $scope.entity = 'location';
        $scope.name = 'Ort';
        $scope.tableheaders = {
            isActive: 'Aktiv?',
            name: 'Raumname',
            description: 'Beschreibung'
        };
        $scope.loadEntries = function(){
            locationApi.query((function(data){
            console.log(data);
            $scope.data = data;
        }));};


        $scope.loadEntries();

        $scope.delete = function(id) {
            locationApi.delete({id:id});
            $scope.loadEntries();
        };

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
                                header: 'Ort löschen',
                                text: 'Ort wirklich löschen?',
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