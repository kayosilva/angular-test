angular.module('app')
    .controller('HomeCtrl', function ($scope, $rootScope, $location, RelatorioService) {
        $rootScope.activeMenu = $location.path();

        $scope.dadosRelatorio1 = {labels: [], data: [], colors: ['#d9534f', '#428bca']};

        $scope.dadosRelatorio2 = {
            labels: [],
            series: ['Focas'],
            data: []
        }


        function getDadosRelatorio1() {
            RelatorioService.getRelatorioVivosXMortos().then(function (response) {
                var resRelatorio1 = response.data;
                angular.forEach(resRelatorio1, function (dados) {
                    $scope.dadosRelatorio1.labels.push(dados.nome_status);
                    $scope.dadosRelatorio1.data.push(dados.qtd);
                });
            });
        }

        function getDadosRelatorio2() {
            RelatorioService.getRelatorioFilhotesPorFoca().then(function (response) {
                angular.forEach(response.data, function (dados) {
                    $scope.dadosRelatorio2.labels.push(dados.nome);
                    $scope.dadosRelatorio2.data.push(dados.qtd_filhotes);
                });
            });
        }

        $scope.$on('$viewContentLoaded', function () {
            getDadosRelatorio1();
            getDadosRelatorio2();
        });

    });