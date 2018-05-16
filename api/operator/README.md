# Endpoints

> GET /api/operator/

Risponde con una lista contenente tutti gli operatori disponoibili alla piattaforma.

Good response:
```
{
    "success": true,
    "msg": "Here you go, have your results.",
    "data": {
        "ids": [78,897,1477]
    }
}
```

> GET /api/operator/:id

Risponde con dettagli in merito ad un operatore specifico specificato in modo univoco dal parametro id.

Good response:
```
{
    "success": true,
    "msg": "Here you are.",
    "data": {
        "name": "mario",
        "last_name": "rossi",
        "status": "Abilitato",
        "vlad_index": 72,
        "assigned_reportings": [],
        "assigned_requests": []
    }
}
```

> POST /api/operator/

Aggiunge un nuovo operatore alla piattaforma, questo successivamente deve essere autenticato. Per usi "amministrativi" only

@params
##### body.name
STRING  -   Nome del tipo
##### body.last_name
STRING  -   Cognome del tipo

Good response:
```
{
    "success": true,
    "msg": "Operator added successfuly.",
    "data": {
        "id": 72
    }
}
```

> PUT /api/operator/:id

Aggiorna lo stato corrente di una richiesta di ritiro in base al parametro body.status.
NON IMPLEMENTATA

Good response:
```
{
    "success": true,
    "msg": "ok"
}
```

> DELETE /api/operator/:id

Cancella un operatore della piattaforma, identificandolo per ID. Questo non sara' quindi piu' accessibile utilizzando
get /api/operator/
Good response:
```
{
    "success": true,
    "msg": "Here you are little boy, the database was updated."
}
```