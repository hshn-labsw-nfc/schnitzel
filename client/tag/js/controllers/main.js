(function () {
    var app = angular.module('schnitzelApp');

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($scope) {
        $scope.main = {};
        $scope.main.game = {
            running: true,
                progress: {
                done: 2,
                count: 8
            }
        };
    }

})();