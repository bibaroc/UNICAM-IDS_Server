var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var location = new Schema({
    "address": {
        "type": String,
        "required": false,
        "default": "The address was not set."
    },
    "phoneNumber": {
        "type": String,
        "required": false,
        "default": "Phone number not set.",
        "validate": {
            "isAsync": true,
            "validator": function (v, cb) {
                setTimeout(function () {
                    if (v==="Phone number not set.") {
                        cb(true, "The phone number wasn't set, however you should not be able to see this.");
                    } else if (!/([0-9]{10})$/.test(v)) {
                        cb(false, v + " is not a valid phone number.");
                    } else {
                        cb(true, v + " is a valid phone number. But you should not be able to see this.");
                    }
                }, 5);
            },
            "message": "Should not see this."
        }
    },
    "lat": {
        "type": Number,
        "required": [true, "We could really use the information about your location."],
        "validate": {
            "isAsync": true,
            "validator": function (v, cb) {
                setTimeout(function () {
                    if (v < -90 || v > 90) {
                        cb(false, v + " is not a valid latitude value.");
                    } else {
                        cb(true, v + " is a valid latitude value. But you should not be able to see this.");
                    }
                }, 5);
            },
            "message": "Should not see this."
        }
    },
    "long": {
        "type": Number,
        "required": [true, "We could really use the information about your location."],
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
        }
    }
});
//TODO: any complex validation goes in here.
location.pre("save", function (next) {
    if (require("../../config/env.config").env === "dev") {
        next();
    } else {
        next();
    }
});

module.exports = mongoose.model("Location", location);