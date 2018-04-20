# Endpoints

> GET /api/request/

Risponde con una una lista contentente tutti gli ID di tutte le richieste

Good response:
```
{
    "success": true,
    "msg": "Here you go, have your results.",
    "data": {
        "ids": "5ad8c900b10b8e24b8075932, 5ad8c9e58d584f06f85e785f, 5ad8ca1b0c92d71b186bb81c, 5ad8ca7bf7540729a4ea5948"
    }
}
```

> GET /api/request/:id

Risponde con dettagli in merito ad una richiesta specifica, identificata dal parametro ID.

Good response:
```
{
    "success": true,
    "msg": "Here you are.",
    "data": {
        "location": {
            "lat": 23,
            "long": 117,
            "phoneNumber": "3564706594",
            "address": "vicolo mare 7 civitanova marche alta"
        },
        "preferred_date": "1524329851431",
        "date": 1524157043565,
        "status": "In_Corso"
    }
}
```

> POST /api/request/

Aggiunge una nuova richesta al database, in modo tale che questa possa dopo essere successivamente analizzate ed eseguita.

@params
##### body.lat
INTEGER -   -90 < lat < 90
##### body.long
INTEGER -   180 < long < 180
##### body.address
STRING -   Indirizzo al quale si dovrebbe effettuare il ritiro.
##### body.phone
INTEGER -   Numero di telefono.
##### body.pref
INTEGER  -   Unix time stamp di quando si preferisce che avvenga il ritiro.
Per default e' posto a distanza di due giorni dalla data corrente.


Good response:
```
{
    "success": true,
    "msg": "Report added successfuly.",
    "data": {
        "id": "5ad9c568d997ac2ca84213dc"
    }
}
```

> PUT /api/request/:id

Aggiorna lo stato corrente di una richiesta di ritiro in base al parametro body.status.

@params
##### body.status
uno di   -   Da_Analizzare Rifiutata Accettata In_Corso Completata

Good response:
```
{
    "success": true,
    "msg": "ok"
}
```

> DELETE /api/request/:id

Cancella una richiesta, identificata dal parametro ID,
in altre parole lo status della richiesta viene posto a "rifiutata".

Good response:
```
{
    "success": true,
    "msg": "Here you are little boy, the database was updated."
}
```