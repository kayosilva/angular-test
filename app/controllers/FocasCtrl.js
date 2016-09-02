angular.module('app')
    .controller('FocasCtrl', function ($scope, $rootScope, $location, $http, CONFIG_APP) {
        $rootScope.activeMenu = $location.path();
        $scope.focas = [];

        function getFocas() {

            $http.get(CONFIG_APP.url + "/focas").then(function (response) {

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


        $scope.$on('$viewContentLoaded', function () {
            getFocas()
        });
    });