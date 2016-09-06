angular.module('app')
    .controller('DetalharFocaCtrl', function ($scope, $uibModalInstance, dataFoca, FocaService, ngNotify) {
        $scope.foca = dataFoca;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        /**
         * Ação ao clicar em confirmar do deletar
         */
        $scope.confirmar = function () {
            FocaService.deletar($scope.foca.id).then(function () {
                $scope.cancel();
                ngNotify.set("Registro removido com sucesso!", "success")
            }, function (error) {
                $scope.cancel();
                ngNotify.set("Erro ao tentar deletar. " + error, "error");
            });
        }
    });