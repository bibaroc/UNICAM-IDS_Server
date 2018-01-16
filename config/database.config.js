module.exports =
    {
        //String used to connect to mongo.
    "database": "mongodb://<ID>:<PW>@ds044787.mlab.com:44787/unicam_ids_db",
        //Database options.
        "databaseOptions": {
            "server": {
                "socketOptions": {
                    "keepAlive": true,
                    "connectTimeoutMS": 2000
                }
            }
        }
    };