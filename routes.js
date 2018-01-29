"use strict";

//Various routes configuration
module.exports = function(application){
    application.use("/api/reporting", require("./api/reporting/reporting.index"));
};