(function () {
    var app = angular.module('schnitzelApp');

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($scope) {
        $scope.game = {
            running: true,
                progress: {
                done: 7,
                count: 8
            }
        };
    }

})();