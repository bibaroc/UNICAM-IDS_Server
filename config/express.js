"use strict";
var config = require("./config");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var compression = require("compression");
//Configuration of various modules and express
module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ "extended": true }));
    app.use(compression());
    try {
        app.use(morgan(config.logger));
    } catch (error) {
        console.log("The logger was not able to recognize '" + config.logger + "' as a valid logger option. Please check ./modules/config.js");
        app.use(morgan("dev"));
    }
};