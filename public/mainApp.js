/**
* Main AngularJS Web Application
*/
var app = angular.module('mainApp', [
    'ngRoute'
]);

/**
* Configure the Routes
*/
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/help", { templateUrl: "/partials/help.html", controller: "helpCtrl" })
        .when("/automezzi", { templateUrl: "/partials/management/Automezzi.html", controller: "automezziCtrl" })
        .when("/operatori", { templateUrl: "/partials/management/Operatori.html", controller: "operatoriCtrl" })
        .when("/richieste", { templateUrl: "/partials/management/Richieste.html", controller: "richiesteCtrl" })
        .when("/segnalazioni", { templateUrl: "/partials/management/Segnalazioni.html", controller: "segnalazioniCtrl" })
        .when("/utenti", { templateUrl: "/partials/management/Utenti.html", controller: "utentiCtrl" })
        .when("/storico", { templateUrl: "/partials/reports/Storico.html", controller: "storicoCtrl" })
        

      //  .otherwise("/404", { templateUrl: "partials/404.html", controller: "PageCtrl" });
}]);




//CONTROLLER AUTOMEZZI
app.controller('automezziCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { targa: "GT760XS", posti: "3", disponibile: "Si", capacita: "400kg" },
        { targa: "GT710XS", posti: "2", disponibile: "Si", capacita: "400kg" },
        { targa: "GX320BV", posti: "2", disponibile: "Si", capacita: "400kg" },
    ];

});
//CONTROLLER OPERATORI
app.controller('operatoriCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { nome: "Renzi", cognome: "SHISH", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" },
        { nome: "Berlusconi", cognome: "Mi consenta", indirizzo: "pozzi", dataInizio: "no", taskAssegnati: "5" },
        { nome: "Salvini", cognome: "RUSPAA", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" },
        { nome: "DiLuglio", cognome: "7Stelle", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" }

    ];

});
//CONTROLLER RICHIESTE
app.controller('richiesteCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { id: "09213", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
        { id: "01293", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
        { id: "01283", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
    ];
    $http.get("/api/reporting/")
        .then(
            //Questa viene runnata, se ti rispondo con codici da 100 a 499
            (data) => { console.log(JSON.stringify(data.data)) },
            //Questa viene runnato con 500
            (data) => { }
        );

});
//CONTROLLER SEGNALAZIONI
app.controller('segnalazioniCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { id: "09123", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
        { id: "02923", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
        { id: "02823", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
    ];

});
//CONTROLLER UTENTI
app.controller('utentiCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { nome: "Rosario", cognome: "Culmone", indirizzo: "Ludovici", abilitato: "si" },
        { nome: "Vladyslav", cognome: "Sulimovskyy", indirizzo: "WWW", abilitato: "no" },
        { nome: "Marco", cognome: "Prontera", indirizzo: "Casa mia", abilitato: "si" }

    ];

});
//CONTROLLER DELLO STORICO
app.controller('storicoCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    //dati delle vecchie segnalazioni e richieste effettuate
    $scope.data = [

        { id: "09999", data: "Pronte", nome_Utente: "pozzi", info: "si" },
        { id: "01245", data: "Pronte", nome_Utente: "pozzi", info: "si" },
        { id: "01283", data: "Pronte", nome_Utente: "pozzi", info: "si" },
    ];

});
//CONTROLLER PAGINA HELP
app.controller('helpCtrl', function ($scope, $location, $http) {
    console.log("pagina di help per l'amministratore");
});