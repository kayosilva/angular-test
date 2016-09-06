angular.module('app')
    .controller('DetalharFocaCtrl', function ($scope, $uibModalInstance, dataFoca) {
        $scope.foca = dataFoca;
        console.log($scope.foca);
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });