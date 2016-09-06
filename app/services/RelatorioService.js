angular.module('app').service("RelatorioService", function (CONFIG_APP, $http) {


    this.getRelatorioVivosXMortos = function () {
        return $http.get(CONFIG_APP.url + "/relatorios/nascidos-vivosxmortos");
    }

    this.getRelatorioFilhotesPorFoca = function () {
        return $http.get(CONFIG_APP.url + "/relatorios/filhotes-por-foca");
    }
});