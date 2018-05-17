var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Reporting = require("./../reporting/reporting.module");
let Request = require("./../request/request.module");

var repo = new Schema({
    "name": {
        "type": String,
        "required": true,
    },
    "last_name": {
        "type": String,
        "required": true,
    },
    "status": {
        "type": String,
        "enum": { "values": "Abilitato Disabilitato".split(" "), "message": "Unfortunatly the value you sent us is not a valid category." },
        "required": [true, "An operator must be either Abilitato or Disabilitato"]
    },
    "assigned_requests": {
        "type": [Number],
        "ref": "Request"
    },
    "assigned_reportings": {
        "type": [Number],
        "ref": "Reporting"
    },
    "vlad_index": {
        "type": Number,
        "required": true,
        "unique": true
    }
});
//TODO: any complex validation goes in here.
repo.pre("save", function (next) {
    if (require("../../config/env.config").env === "dev") {
        next();
    } else {
        next();
    }
});

module.exports = mongoose.model('Operator', repo);