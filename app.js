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
require("./routes")(app);
app.listen(envConfig.env === "dev" ? 8080 : 80, function () {
    console.log("Listening for http requests on port: " + (envConfig.env === "dev" ? "8080" : "80"));
});