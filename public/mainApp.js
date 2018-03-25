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
        .when("/automezzi", { templateUrl: "/partials/management/Automezzi.html", controller: "automezziCtrl" })
        .when("/operatori", { templateUrl: "/partials/management/Operatori.html", controller: "operatoriCtrl" })
        .when("/richieste", { templateUrl: "/partials/management/Richieste.html", controller: "richiesteCtrl" })
        .when("/segnalazioni", { templateUrl: "/partials/management/Segnalazioni.html", controller: "segnalazioniCtrl" })
        .when("/utenti", { templateUrl: "/partials/management/Utenti.html", controller: "utentiCtrl" })
        .when("/storico", { templateUrl: "/partials/reports/Storico.html", controller: "storicoCtrl" })
        .when("/help", { templateUrl: "/partials/help.html", controller: "helpCtrl" })
    // else 404
    //.otherwise("/404", { templateUrl: "partials/404.html", controller: "PageCtrl" });
}]);




//CONTROLLER AUTOMEZZI
app.controller('automezziCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { targa: "Samt", posti: "Pronte", disponibile: "pozzi", capacita: "si" },
        { targa: "SamtO", posti: "Pronte", disponibile: "pozzi", capacita: "si" },
        { targa: "CICCIO", posti: "Pronte", disponibile: "pozzi", capacita: "si" },
    ];

});
//CONTROLLER OPERATORI
app.controller('operatoriCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { nome: "Marco", cognome: "Pronte", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" },
        { nome: "MarcoX", cognome: "Pronte", indirizzo: "pozzi", dataInizio: "no", taskAssegnati: "5" },
        { nome: "MarcoS", cognome: "Pronte", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" },
        { nome: "Marco", cognome: "Pronte", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" }

    ];

});
//CONTROLLER RICHIESTE
app.controller('richiesteCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { id: "09213", data: "Pronte", nome_Utente: "pozzi", info: "si" },
        { id: "01293", data: "Pronte", nome_Utente: "pozzi", info: "si" },
        { id: "01283", data: "Pronte", nome_Utente: "pozzi", info: "si" },
    ];

});
//CONTROLLER SEGNALAZIONI
app.controller('segnalazioniCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { id: "09999", data: "Pronte", nome_Utente: "pozzi", info: "si" },
        { id: "01245", data: "Pronte", nome_Utente: "pozzi", info: "si" },
        { id: "01283", data: "Pronte", nome_Utente: "pozzi", info: "si" },
    ];

});
//CONTROLLER UTENTI
app.controller('utentiCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { nome: "Marco", cognome: "Pronte", indirizzo: "pozzi", abilitato: "si" },
        { nome: "MarcoX", cognome: "Pronte", indirizzo: "pozzi", abilitato: "no" },
        { nome: "MarcoS", cognome: "Pronte", indirizzo: "pozzi", abilitato: "si" }

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
app.controller('helpCtrl', function (/* $scope, $location, $http */) {
    console.log("pagina di help per l'amministratore");
});