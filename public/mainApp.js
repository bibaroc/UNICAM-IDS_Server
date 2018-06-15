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

        // { nome: "Renzi", cognome: "SHISH", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" },
        // { nome: "Berlusconi", cognome: "Mi consenta", indirizzo: "pozzi", dataInizio: "no", taskAssegnati: "5" },
        // { nome: "Salvini", cognome: "RUSPAA", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" },
        // { nome: "DiLuglio", cognome: "7Stelle", indirizzo: "pozzi", dataInizio: "si", taskAssegnati: "5" }

    ];
    $http.get("api/operator")
    .then(
        //Questa viene runnata, se ti rispondo con codici da 100 a 499
        (response) => {
            //console.log(response);
             for (let i = 0; i < response.data.data.ids.length; i++) {
                
                 $http.get("/api/operator/" + response.data.data.ids[i]).then(
                     
                     (res) => {
                         console.log(res.data.data);
                         $scope.data.push({
                            id : res.data.data.vlad_index,
                            nome: res.data.data.name,
                            cognome: res.data.data.last_name,
                            richieste: res.data.data.assigned_requests,
                            segnalazioni: res.data.data.assigned_reportings

                         });
                     },
                     (res) => { }
                 )
             }

        },
        //Questa viene runnato con 500
        (data) => { }
    );
    $scope.setEliminaOperatore = (a) => {
        console.log(a + " si elimina tale richiesta");
        window.idOperatorToDelete = a;
    }
    $scope.confermaRemoveOperatore = () => {
        console.log(window.idOperatorToDelete);
        $http.delete("/api/operator/"+window.idOperatorToDelete);
        window.idOperatorToDelete = "";
        location.reload();
    }

});
var ciccio = "ciao";
//CONTROLLER RICHIESTE
app.controller('richiesteCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        /* { id: "09213", data: "03/03/2018", immagine: "foto", cordinate: "NN", descrizione: "blabla" },
         { id: "01293", data: "03/03/2018", immagine: "foto", cordinate: "NN", descrizione: "blabla" },
         { id: "01283", data: "03/03/2018", immagine: "foto", cordinate: "NN", descrizione: "blabla" },*/
    ];
    $scope.operator = [];
    $http.get("/api/request/")
        .then(
            //Questa viene runnata, se ti rispondo con codici da 100 a 499
            (response) => {
                
                for (let i = 0; i < response.data.data.ids.length; i++) {
                    $http.get("/api/request/" + response.data.data.ids[i]).then(
                        (res) => {

                            let time = new Date(res.data.data.date);
                            
                            $scope.data.push({
                                
                                id: response.data.data.ids[i],
                                name: res.data.data.name,
                                data: time.getDay() + "/" + time.getMonth() + "/" + time.getFullYear(),
                                numero: res.data.data.location.phoneNumber,
                                status: res.data.data.status

                            });
                        },
                        (res) => { }
                    )
                }

            },
            //Questa viene runnato con 500
            (data) => { }
        );
        $http.get("api/operator/request_free")
        .then(
            //Questa viene runnata, se ti rispondo con codici da 100 a 499
            (response) => {
                //console.log(response.data.data.ids);
                 for (let i = 0; i < response.data.data.ids.length; i++) {
                     $http.get("/api/operator/" + response.data.data.ids[i]).then(
                         (res) => {
                             //console.log(res.data.data);
                            
                             $scope.operator.push({
                                idop : res.data.data.vlad_index,
                                nomeop: res.data.data.name,
                                cognomeop: res.data.data.last_name
                                
    
                             });
                         },
                         (res) => { }
                     )
                 }
    
            },
            //Questa viene runnato con 500
            (operator) => { }
        );
    $scope.setEliminaRichiesta = (a) => {
        console.log(a + " si elimina tale richiesta");
        window.abcdef = a;
    }
    $scope.conferma = () => {
        console.log(window.abcdef);
        $http.delete("/api/request/"+window.abcdef);
        window.abcdef = "";
        location.reload();
    }
    $scope.bindaOperatore = (c) => {
        window.richiestaDaBindare = c;
    }
    $scope.setOperatoreScelto = (s) => {
        if(window.previousOperatorForRequest){
            if(s==window.previousOperatorForRequest){
                s = undefined;
            }
            if(s!==window.previousOperatorForRequest){
                //se il nuovo è diverso dal precende, il precendete lo disabilito
                document.getElementById(window.previousOperatorForRequest+"opRequest").checked = false;
            }
        }
        window.previousOperatorForRequest = s;
        window.operatoreDaBindare = s;

    }
    $scope.confermaAssegnazioneRichiesta = () =>{
        if(window.operatoreDaBindare){
            document.getElementById("requeAssClose").click();
            $http.put("/api/operator/"+window.operatoreDaBindare, { task: window.richiestaDaBindare} );
            location.reload();
        }else{
            document.getElementById("msgModalRequest").innerText = "Per favore seleziona un operatore";
            setTimeout(
                function() {
                    document.getElementById("msgModalRequest").innerText = "";
                }, 3000);
        }
        
    }
   
  
   

});
//CONTROLLER SEGNALAZIONI
app.controller('segnalazioniCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        /*{ id: "09123", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
        { id: "02923", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },
        { id: "02823", data: "03/03/2018", nome_Utente: "The_Cittadino", info: "NN" },*/
    ];

    $http.get("/api/reporting/")
        .then(
            //Questa viene runnata, se ti rispondo con codici da 100 a 499
            (response) => { //console.log(response.data.data.ids);

                for (let i = 0; i < response.data.data.ids.length; i++) {
                    $http.get("/api/reporting/" + response.data.data.ids[i]).then(
                        (res) => {
                            let time = new Date(res.data.data.date);
                            $scope.data.push({

                                id: response.data.data.ids[i],
                                data: time.getDay() + "/" + time.getMonth() + "/" + time.getFullYear(),
                                immagine: res.data.data.pathToPhoto,
                                cordinate: res.data.data.location.lat + " : " + res.data.data.location.long,
                                descrizione: res.data.data.description,
                                status: res.data.data.status

                            });
                        },
                        (res) => { }
                    )
                }

            },
            //Questa viene runnato con 500
            (data) => { }
        );
        $scope.operator = [];
        $http.get("api/operator/reporting_free")
        .then(
            //Questa viene runnata, se ti rispondo con codici da 100 a 499
            (response) => {
                console.log(response.data.data.ids);
                 for (let i = 0; i < response.data.data.ids.length; i++) {
                     $http.get("/api/operator/" + response.data.data.ids[i]).then(
                         (res) => {
                             //console.log(res.data.data);
                            
                             $scope.operator.push({
                                idop : res.data.data.vlad_index,
                                nomeop: res.data.data.name,
                                cognomeop: res.data.data.last_name
                                
    
                             });
                         },
                         (res) => { }
                     )
                 }
    
            },
            //Questa viene runnato con 500
            (operator) => { }
        );
        $scope.bindaOperatorePerSegnalazione = (c) => {
            window.segnalazioneDaBindare = c;
        }
        $scope.setOperatoreSceltoPerSegnalazione = (s) => {
            if(window.previousOperatorForReporting){
                if(s==window.previousOperatorForRequest){
                    s = undefined;
                }
                if(s!==window.previousOperatorForReporting){
                    //se il nuovo è diverso dal precende, il precendete lo disabilito
                    document.getElementById(window.previousOperatorForReporting+"opReporting").checked = false;
                }
            }
            window.previousOperatorForReporting = s;
            window.operatoreDaBindareSegnalazione = s;
    
        }
        $scope.confermaAssegnazioneSegnalazione = () =>{
            if(window.operatoreDaBindareSegnalazione){
                document.getElementById("repoAssClose").click();
                $http.put("/api/operator/"+window.operatoreDaBindareSegnalazione, { task: window.segnalazioneDaBindare} );
                location.reload();
            }else{
                document.getElementById("msgModalReporting").innerText = "Per favore seleziona un operatore";
                setTimeout(
                    function() {
                        document.getElementById("msgModalReporting").innerText = "";
                    }, 3000);
            }
            
        }
});
//CONTROLLER UTENTI
app.controller('utentiCtrl', function ($scope, $location, $http) {
    $scope.search = {};
    $scope.data = [

        { nome: "Mario", cognome: "Rossi", indirizzo: "Via Giorgio Fontini 2  FM", abilitato: "si" },
        { nome: "Claudio", cognome: "Pozzetti", indirizzo: "Via Pietro Giuliazzi 3  AP", abilitato: "no" },
        { nome: "Francesco", cognome: "Sghignozzi", indirizzo: "Via Patata Bollente 1  AP", abilitato: "si" }

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