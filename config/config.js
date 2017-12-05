module.exports =
    {
        //String used to connect to mongo.
        "database": "mongodb://127.0.0.1:27017/junkInTheTrunk",
        //Database options.
        "databaseOptions": {
            "server": {
                "socketOptions": {
                    "keepAlive": 666,
                    "connectTimeoutMS": 666
                }
            }
        },
        "env": "dev",
        "logger": "tiny"
        /*
        Possible logger values most complete to the simplest ones
        0. combined
        1. common
        2. dev
        3. short
        4. tiny
        **/
    };