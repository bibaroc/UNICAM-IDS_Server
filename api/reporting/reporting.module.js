var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repo = new Schema({
    "category": {
        "type": String,
        "enum": ["Hi", "Here", "Are", "Some", "Examples", "uncategorized"],
        "required": false,
        "validate": {
            isAsync: true,
            validator: function (v, cb) {
                setTimeout(function () {
                    // First argument is a boolean, whether validator succeeded
                    // 2nd argument is an optional error message override
                    cb(["Hi", "Here", "Are", "Some", "Examples", "uncategorized"].indexOf(v) != -1, v + " is not a valid category.");
                }, 5);
            },
            // Default error message, overridden by 2nd argument to `cb()` above
            message: "Should not see this."
        },
        "default": "uncategorized"
    },
    "description": {
        "type": String,
        "required": [true, "Can you please add a description?"]
    },
    "location": {
        "lat": {
            "type": Number,
            "required": [true, "We could realy use your information in orded to provide the best service possible."]
        },
        "long": {
            "type": Number,
            "required": [true, "We could realy use your information in orded to provide the best service possible."]
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