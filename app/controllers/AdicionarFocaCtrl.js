angular.module('app')
    .controller('AdicionarFocaCtrl', function ($scope, $routeParams, FocaService, ngNotify, $filter) {
        $scope.foca = {};

        /**
         * Seta os valores iniciais no model de foca
         */
        function startModel() {
            $scope.foca = {genero: "F", status: 1};
        }

        function getFoca(id) {
            FocaService.getFoca(id).then(function (response) {

                var foca = response.data;

                foca.dtNascimento = $filter("asDate")(foca.dtNascimento.date, "dd/MM/yyyy")
                $scope.foca = foca;
            }, function (error) {
                ngNotify.set(error, "error");
            });
        }


        /**
         * Salva os dados
         */
        $scope.salvarDados = function () {
            var dadosFoca = $scope.foca;
            FocaService.salvar(dadosFoca)
                .then(function (response) {
                    ngNotify.set("Registro salvo com sucesso!", "success");
                    if (!dadosFoca.id) {
                        startModel();
                    }
                }, function () {
                    ngNotify.set("Erro ao salvar dados!", "error");
                });

        }

        $scope.$on('$viewContentLoaded', function () {
            startModel();

            if ($routeParams && $routeParams.id) {
                getFoca($routeParams.id);
            }
        });
    });