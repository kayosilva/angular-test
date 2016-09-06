angular.module('app')
    .controller('FocasCtrl', function ($scope, $rootScope, $location, $http, CONFIG_APP, $uibModal, FocaService) {
        $rootScope.activeMenu = $location.path();
        $scope.focas = [];
        $scope.modalInstance = null;

        /**
         * Lista todas as focas
         */
        function getFocas() {
            FocaService.getAll().then(function (response) {
                if (response.data.length) {
                    angular.forEach(response.data, function (data) {
                        data.qtd_filhotes = data.children.length;
                        data.dt_nas = data.dtNascimento.date;
                        $scope.focas.push(data);
                    });
                }

            }, function (error) {
                console.log(error);
            });
        }

        /**
         * Abre modal para detalhar o registro
         * @param focaObj
         */
        $scope.openModal = function (focaObj) {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/views/modalfoca.html',
                controller: 'DetalharFocaCtrl',
                resolve: {
                    dataFoca: function () {
                        return focaObj;
                    }
                }
            });
        }

        /**
         * Abre o model para deletar registro
         * @param focaObj
         */
        $scope.abreModalDelete = function (focaObj) {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/views/modalfocadelete.html',
                controller: 'DetalharFocaCtrl',
                resolve: {
                    dataFoca: function () {
                        return focaObj;
                    }
                }
            })
            $scope.modalInstance.result.then(function (data) {
            }, function () {
                $scope.focas = [];
                getFocas();
            });
        }

        $scope.$on('$viewContentLoaded', function () {
            getFocas();
        });
    });