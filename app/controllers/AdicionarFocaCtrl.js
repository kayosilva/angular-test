angular.module('app')
    .controller('AdicionarFocaCtrl', function ($scope, FocaService) {
        $scope.foca = {};


        /**
         * Seta os valores iniciais no model de foca
         */
        function startModel() {
            $scope.foca = {genero: "F", status: 1};
        }


        //inicia uma variavel com objeto vazio para as mensagens
        $scope.mensagem = {};

        /**
         * Fecha o alerta
         */
        $scope.closeAlert = function () {
            $scope.mensagem = {};
        };

        /**
         * Salva os dados
         */
        $scope.salvarDados = function () {
            var dadosFoca = $scope.foca;
            FocaService.salvar(dadosFoca)
                .then(function (response) {
                    $scope.mensagem = {
                        type: "success",
                        text: "Registro salvo com sucesso!",
                        title: "Sucesso!"
                    }
                    startModel();

                }, function () {
                    $scope.mensagem = {
                        type: "warning",
                        text: "Erro ao salvar dados!",
                        title: "Erro!"
                    }
                });

        }

        $scope.$on('$viewContentLoaded', function () {
            startModel();
        });
    });