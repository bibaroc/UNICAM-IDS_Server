"use strict";
var databaseConfig = require("./config/database.config");
var envConfig = require("./config/env.config");
var mongoose = require("mongoose");
var app = require("express")();

mongoose.connect(databaseConfig.database, databaseConfig.databaseOptions);
mongoose.connection.on("error", function (errorWithMongo) {
    console.error("MongoDB error: " + errorWithMongo.message);
    process.exit(3);
});

require("./config/express")(app);

let max_vlad_index = [
    require("./api/reporting/reporting.module").findOne().select("vlad_index").sort("-vlad_index").limit(1).exec(),
    require("./api/request/request.module").findOne().select("vlad_index").sort("-vlad_index").limit(1).exec(),
    require("./api/operator/operator.module").findOne().select("vlad_index").sort("-vlad_index").limit(1).exec(),
];

Promise.all(max_vlad_index)
    .then(
        (ok) => {
            global.max_index = 1;
            for (let i = 0; i < ok.length; i++)
                if (ok[i])
                    global.max_index = ok[i].vlad_index > global.max_index ? ok[i].vlad_index : global.max_index;

            require("./routes")(app);
            app.listen(envConfig.env === "dev" ? 8080 : 80, "127.0.0.1", function () {
                console.log("Listening for http requests on port: " + (envConfig.env === "dev" ? "8080" : "80"));
                console.log("max_index: " + max_index);
            });
        },
        (not_ok) => { console.log(not_ok) }
    )
    .catch(
        (not_ok) => { console.log(not_ok); }
    );


