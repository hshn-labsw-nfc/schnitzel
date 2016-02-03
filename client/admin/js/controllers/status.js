(function () {
    var app = angular.module('status', ['ui.bootstrap', 'api', 'modal']);

    app.controller('StatusCtrl', StatusCtrl);

    function StatusCtrl($scope,locationApi,sessionApi,$uibModal) {

        $scope.entity = 'session';
        $scope.heading = 'Gruppenstatus';
        $scope.name = 'Ort';

        $scope.loadEntries = function () {
            sessionApi.query(function (data) {
                console.log(data);
                data.forEach(function (session) {
                    session.progress = {
                        count: session.locationCount,
                            done: session.locationCount - session.locationsToVisit.length - (session.task == 'findLocation' ? 1 : 0)
                    };
                });

                $scope.sessions = data;
            });

            locationApi.query(function (data) {
                console.log(data);
                $scope.locations = {};
                data.forEach(function (location) {
                    $scope.locations[location._id]=location.name;
                });

            });

        };

        $scope.loadEntries();

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

                            header: 'Schnitzeljagd-Sessions löschen',
                            text: 'Wirklich alle Aktiven Schnitzeljagd-Sessions löschen?',
                            confirmButtonText: 'Löschen',
                            cancelButtonText: 'Abbrechen'
                        };
                        return $scope.message;
                    },
                    callback: function() {
                        return function (success) {
                            if(success) {
                                $scope.deleteAllSessions();
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

        $scope.deleteAllSessions = function () {
            var count;
            var done = 0;
            function checkProgress(){
                console.log(done, count);
                done++;
                if(done == count){
                    $scope.loadEntries();
                }
            }

            sessionApi.query(function (sessions){
                count = sessions.length;
                sessions.forEach(function(session){
                    sessionApi.delete({id:session._id}, checkProgress);
                })
            });

        }
    }

})();