angular.module('app')
    .controller('HomeCtrl', function ($scope, $rootScope, $location) {
        $rootScope.activeMenu = $location.path();
    });