angular.module('app')
    .controller('AdicionarFocaCtrl', function ($scope, $routeParams, FocaService, ngNotify, $filter) {
        $scope.foca = {};

        $scope.focasGenitoras = [];
        /**
         * Seta os valores iniciais no model de foca
         */
        function startModel() {
            $scope.foca = {genero: "F", status: 1};
            $scope.focasGenitoras = [];
        }

        function getFoca(id) {
            FocaService.getFoca(id).then(function (response) {
                var foca = response.data;
                foca.parent_id = foca.parent;
                foca.dtNascimento = $filter("asDate")(foca.dtNascimento.date, "dd/MM/yyyy");
                $scope.foca = foca;
            }, function (error) {
                ngNotify.set(error, "error");
            });
        }

        function getFocasGenitoras() {
            //busca todas as focas
            FocaService.getAll().then(function (response) {
                //percorre os registros
                angular.forEach(response.data, function (foca) {
                    //verifica qual se a foca é diferente da que esta sendo editada ou se ela é
                    //femea e esta viva
                    if ($scope.foca.id != foca.id
                        && foca.genero == "F"
                        && foca.status == 1) {
                        $scope.focasGenitoras.push(foca);
                    }
                });

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
                    } else {
                        getFoca(response.data.id);
                    }
                    getFocasGenitoras();
                }, function () {
                    ngNotify.set("Erro ao salvar dados!", "error");
                });

        }

        $scope.$on('$viewContentLoaded', function () {
            startModel();
            if ($routeParams && $routeParams.id) {
                getFoca($routeParams.id);
            }
            getFocasGenitoras();
        });
    });