angular.module('app').service("FocaService", function (CONFIG_APP, $http) {


    /**
     * Retorna todas as focas
     * @returns {HttpPromise}
     */
    this.getAll = function () {
        return $http.get(CONFIG_APP.url + "/focas");
    }

    /**
     * Salva as focas
     * @param data
     * @returns {HttpPromise}
     */
    this.salvar = function (data) {
        return $http.post(CONFIG_APP.url + "/focas/create", data);
    }

    /**
     * Deleta o registro
     * @param id
     * @returns {HttpPromise}
     */
    this.deletar = function (id) {
        return $http.delete(CONFIG_APP.url + "/focas?id=" + id, {id: id})
    }


})