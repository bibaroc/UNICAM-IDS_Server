module.exports =
    {
        //String used to connect to mongo.
    "database": "mongodb://<user>.<pw>@ds044787.mlab.com:44787/unicam_ids_db",
        //Database options.
        "databaseOptions": {
            "server": {
                "socketOptions": {
                    "keepAlive": 666,
                    "connectTimeoutMS": 666
                }
            }
        }
    };