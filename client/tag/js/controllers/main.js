(function () {
    var app = angular.module('schnitzelApp');

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($scope) {
        $scope.gameRunning = true;
        $scope.progress = {
            done: 3,
            count: 8
        };

    }

})();