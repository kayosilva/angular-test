angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'ngNotify'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider

        // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
            .when('/', {
                templateUrl: 'app/views/home.html',
                controller: 'HomeCtrl',
            })

            // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
            .when('/focas', {
                templateUrl: 'app/views/focas.html',
                controller: 'FocasCtrl',
            })

            // para a rota '/contato', carregaremos o template contato.html e o controller 'ContatoCtrl'
            .when('/foca/add', {
                templateUrl: 'app/views/add.html',
                controller: 'AdicionarFocaCtrl',
            })

            // caso não seja nenhum desses, redirecione para a rota '/'
            .otherwise({redirectTo: '/'});
    }).constant("CONFIG_APP", {
    "public_token": 'ceb67e61be84d393a46495e36876bcd8d49e7e545a28de8a',
    "local_token": 'user_token',
    "url": 'http://localhost:8080/api'
}).filter('asDate', ['$filter', function ($filter) {
    return function (input, format) {
        if (input == null) {
            return "";
        }

        //verifica se a string da data tem horas e separa
        var splitedDate = input.split(" ");

        //verifica se separou
        if (splitedDate.length) {

            //quebra a data
            var dataArr = splitedDate[0].split("-");
            //cria uma nova variavel somente com a data
            var dateTime = new Date(splitedDate[0]);

            //seta cada parte da data
            if (dataArr.length) {
                var dateTime = new Date();
                dateTime.setDate(dataArr[2]);
                dateTime.setMonth((dataArr[1] - 1));
                dateTime.setYear(dataArr[0]);
            }


            //verifica se existe a segunda posição criada pelo split
            if (typeof splitedDate[1] != 'undefined') {

                //separa do . que define datetime2
                var splitedHours = splitedDate[1].split(".");

                //verifica se existia o separador de datetime2
                if (splitedHours.length) {

                    //separa as horas, minutos e segundos
                    var splitTime = splitedHours[0].split(":");

                    //verifica se separou
                    if (splitTime.length) {
                        //seta os valores no datime
                        dateTime.setHours(splitTime[0]);
                        dateTime.setMinutes(splitTime[1]);
                        dateTime.setSeconds(splitTime[2]);
                    }
                }
            }


            return $filter('date')(dateTime, format ? format : 'dd/MM/yyyy HH:mm:ss');

        }

        var dateTime = new Date(input);
        dateTime.setDate(30);
        console.log('data ---> ', input);
        return $filter('date')(dateTime, format ? format : 'dd/MM/yyyy HH:mm:ss');
    };
}]);