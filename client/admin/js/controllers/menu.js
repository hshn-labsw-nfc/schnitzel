(function () {
    var app = angular.module('menu', []);

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = {
            location: {name:'Orte', icon: 'glyphicon glyphicon-pushpin'},
            riddle: {name:'Rätsel', icon: 'glyphicon glyphicon-text-size'},
            tag: {name:'Tags', icon: 'glyphicon glyphicon-tags'},
            status: {name:'Schnitzeljagd Status', icon: 'glyphicon glyphicon-eye-open'},
            config: {name:'Config', icon: 'glyphicon glyphicon-cog'}
        };
    }
})();