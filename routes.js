"use strict";
let express = require("express");
//Various routes configuration
module.exports = function(application){
    application.use(express.static("public"));
    application.use("/api/reporting", require("./api/reporting/reporting.index"));
    application.use("/api/request", require("./api/request/request.index"));
    application.use("/api/operator", require("./api/operator/operator.index"));
};
