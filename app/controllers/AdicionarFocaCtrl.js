angular.module('app')
    .controller('AdicionarFocaCtrl', function ($scope, FocaService, ngNotify) {
        $scope.foca = {};


        /**
         * Seta os valores iniciais no model de foca
         */
        function startModel() {
            $scope.foca = {genero: "F", status: 1};
        }


        /**
         * Salva os dados
         */
        $scope.salvarDados = function () {
            var dadosFoca = $scope.foca;
            FocaService.salvar(dadosFoca)
                .then(function (response) {
                    // $scope.mensagem = {
                    //     type: "success",
                    //     text: "Registro salvo com sucesso!",
                    //     title: "Sucesso!"
                    // }
                    ngNotify.set("Registro salvo com sucesso!", "success")
                    startModel();

                }, function () {
                    ngNotify.set("Erro ao salvar dados!", "error");
                    // $scope.mensagem = {
                    //     type: "warning",
                    //     text: "Erro ao salvar dados!",
                    //     title: "Erro!"
                    // }
                });

        }

        $scope.$on('$viewContentLoaded', function () {
            startModel();
        });
    });