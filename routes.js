"use strict";

//Various routes configuration
module.exports = function(application){
    application.use("/reporting", require("./api/reporting/reporting"));
};