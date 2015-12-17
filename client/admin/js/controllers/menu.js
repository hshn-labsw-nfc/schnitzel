(function () {
    var app = angular.module('menu', ['auth']);

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope, auth, $rootScope){
        $scope.showmenu = auth.isLoggedIn();
        $scope.items = {
            status: {name:'Status', icon: 'glyphicon glyphicon-eye-open'},
            config: {name:'Config', icon: 'glyphicon glyphicon-cog'},
            location: {name:'Orte', icon: 'glyphicon glyphicon-pushpin'},
            riddle: {name:'Rätsel', icon: 'glyphicon glyphicon-text-size'},
            tag: {name:'Tags', icon: 'glyphicon glyphicon-tags'}
        };

        $scope.logout = function(){
            $rootScope.$broadcast('logout');
        };

        $rootScope.$on('login', function(){
            console.log('logins');
            $scope.showmenu = true;
        });

        $rootScope.$on('logout', function(){
            console.log('logout und so');
            $scope.showmenu = false;
        });
    }
})();