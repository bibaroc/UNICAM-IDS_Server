var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Location = require("../location.module");

var repo = new Schema({
    "category": {
        "type": String,
        "enum": { "values": "Vario Umido Carta Plastica Indifferenziato uncategorized".split(" "), "message": "Unfortunatly the value you sent us is not a valid category." },
        "required": false,
        "default": "uncategorized"
    },
    "status": {
        "type": String,
        "enum": { "values": "Da_Analizzare Rifiutata Accettata In_Corso Completata".split(" "), "message": "Unfortunatly the value to be set is not a valid status." },
        "required": false,
        "default": "DaAnalizzare"
    },
    "description": {
        "type": String,
        "required": [true, "Can you please add a description?"]
    },
    "pathToPhoto": {
        "type": String,
        "required": [true, "Could you please send us a photo of the reporting?"]
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
});
//TODO: any complex validation goes in here.
repo.pre("save", function (next) {
    if (require("../../config/env.config").env === "dev") {
        next();
    } else {
        next();
    }
});

module.exports = mongoose.model('Reporting', repo);