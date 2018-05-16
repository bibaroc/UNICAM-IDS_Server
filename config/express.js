"use strict";
var envConfig = require("./env.config");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var compression = require("compression");
//Configuration of various modules and express
module.exports = function (app) {
    app.use(bodyParser.json({"limit": "20mb" }));
    app.use(bodyParser.urlencoded({"limit": "20mb", "extended": true }));
    app.use(compression());
    try {
        app.use(morgan(envConfig.logger));
    } catch (error) {
        console.log("The logger was not able to recognize '" + envConfig.logger + "' as a valid logger option. Please check ./modules/env.config.js");
        app.use(morgan("dev"));
    }
};
