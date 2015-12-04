(function () {
    var app = angular.module('status', ['ui.bootstrap', 'api']);

    app.controller('StatusCtrl', StatusCtrl);

    function StatusCtrl($scope,locationApi,sessionApi) {

        $scope.entity = 'session';
        $scope.name = 'Ort';

        $scope.loadEntries = function () {
            sessionApi.query(function (data) {
                console.log(data);
                data.forEach(function (session) {
                    session.progress = {
                        count: session.locationCount,
                            done: session.locationCount - session.locationsToVisit.length - (session.task == 'findLocation' ? 1 : 0)
                    };
                })

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