# Endpoints

> GET /api/reporting/

Risponde con una lista di tutti gli ID di tutte le signalazioni.

Good response:
```
{
    "success": true,
    "msg": "Here you go, have your results.",
    "data": {
        "ids": "5ad89d3a1f362d236888e7ad, 5ad89d3a1f362d236888e7ee, 52289d3a1f362d236888e7ad"
    }
}
```

> GET /api/reporting/:id

Risponde con dettagli in merito ad una segnalazione specifica, identificata dal parametro ID.

Good response:
```
{
    "success": true,
    "msg": "Here you are.",
    "data": {
        "description": "Descrizione finta di un rifiuto di tipo carta",
        "pathToPhoto": "/img/qualcosa/quellaltro.jpg",
        "location": {
            "lat": 23.84,
            "long": -15.34,
            "phoneNumber": "Phone number not set.",
            "address": "The address was not set."
        },
        "date": 1524145298508,
        "status": "In_Corso",
        "category": "Carta"
    }
}
```

> POST /api/reporting/

Aggiunge una nuova segnalazione al database, in modo tale che questa possa dopo essere analizzata.

@params
##### body.lat
INTEGER -   -90 < lat < 90
##### body.long
INTEGER -   180 < long < 180
##### body.description
STRING  -   Descrizione della segnalazione.
##### body.categoria
STRING  -   uno tra {Vario, Umido, Carta, Plastica, Indifferenziato, uncategorized}
Qualora omesso, uncategorized e' il valore di default.

Good response:
```
{
    "success": true,
    "msg": "Report added successfuly."
}
```

> PUT /api/reporting/:id

Aggiorna lo stato di una richiesta identificata dal parametro ID, richiede un nuovo status nel body

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

> DELETE /api/reporting/:id

Cancella una segnalazione, identificata dal parametro ID,
in altre parole lo status della segnalazione viene posto a "rifiutata".

Good response:
```
{
    "success": true,
    "msg": "Here you are little boy, the database was updated."
}
```