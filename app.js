"use strict";
var config = require("./config/config");
var mongoose = require("mongoose");
var app = require("express")();

mongoose.connect(config.database, config.databaseOptions);
mongoose.connection.on("error", function (errorWithMongo) {
    console.error("MongoDB error: " + errorWithMongo.message);
    process.exit(3);
});


require("./config/express")(app);
require("./routes")(app);
app.listen(config.env === "dev" ? 8080 : 80, function () {
    console.log("Listening for http requests on port: " + config.env === "dev" ? 8080 : 80);
});