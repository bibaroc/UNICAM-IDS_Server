var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repo = new Schema({
    "category": {
        "type": String,
        "enum": { "values": "Hi Here Are Some Examples uncategorized".split(" "), "message": "Unfortunatly the value you sent us is not a valid category." },
        "required": false,
        "default": "uncategorized"
    },
    "description": {
        "type": String,
        "required": [true, "Can you please add a description?"]
    },
    "location": {
        "lat": {
            "type": Number,
            "required": [true, "We really need to access your location in order to provide the best service."],
            "validate": {
                "isAsync": true,
                "validator": function (v, cb) {
                    setTimeout(function () {
                        if (v < -90 || v > 90) {
                            cb(false, v + " is not a valid latitude value.");
                        } else {
                            //v = Number(v);
                            cb(true, v + " is a valid latitude value. But you should not be able to see this.");
                        }
                    }, 5);
                },
                "message": "Should not see this."
            },
        },
        "long": {
            "type": Number,
            "required": [true, "We really need to access your location in order to provide the best service."],
            "validate": {
                "isAsync": true,
                "validator": function (v, cb) {
                    setTimeout(function () {
                        if (v < -180 || v > 180) {
                            cb(false, v + " is not a valid longitude value.");
                        } else {
                            cb(true, v + " is a valid longitude value. But you should not be able to see this.");
                        }
                    }, 5);
                },
                "message": "Should not see this."
            },
        }
    },
    "pathToPhoto": {
        "type": String,
        "required": [true, "Could you please send us a photo of the reporting?"]
    },
    "date": {
        "type": Number,
        "default": Date.now()
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

module.exports = mongoose.model('Reporting', repo);