var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Location = require("../location.module");

var repo = new Schema({
    "preferred_date": {
        "type": Number,
        "required": true,
    },
    "status": {
        "type": String,
        "enum": { "values": "Da_Analizzare Rifiutata Accettata In_Corso Completata".split(" "), "message": "Unfortunatly the value to be set is not a valid status." },
        "required": false,
        "default": "DaAnalizzare"
    },
    "date": {
        "type": Number,
        "default": Date.now()
    },
    "location": {
        "type": Schema.ObjectId,
        "ref": "Location",
        "required": [true, "Please insent the location as it is necessry to the correct funtioning of the platform."]
    },
    "name": {
        "type": String,
        "required": false
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

module.exports = mongoose.model('Request', repo);