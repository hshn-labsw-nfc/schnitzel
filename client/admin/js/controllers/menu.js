(function () {
    var app = angular.module('menu', []);

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = {
            status: {name:'Status', icon: 'glyphicon glyphicon-eye-open'},
            config: {name:'Config', icon: 'glyphicon glyphicon-cog'},
            location: {name:'Orte', icon: 'glyphicon glyphicon-pushpin'},
            riddle: {name:'Rätsel', icon: 'glyphicon glyphicon-text-size'},
            tag: {name:'Tags', icon: 'glyphicon glyphicon-tags'}

        };
    }
})();