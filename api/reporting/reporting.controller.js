"use strict";

var Reporting = require("./reporting.module");

exports.post = function (req, res) {
    if (!req.body || !req.body.description || !req.body.lat || !req.body.long || !req.body.category) {
        return res.status(400).send({
            "success": false,
            "msg": "We were not able to decode the information sent to us."
        });
    } else if (isNaN(parseFloat(req.body.lat)) || isNaN(parseFloat(req.body.long))) {
        return res.status(400).send({
            "success": false,
            "msg": "We were not able to read your information correctly. Could you please resend us the request?."
        });
    } else {
        //I know the information i need is present in the body
        (new Reporting({
            "description": req.body.description,
            "pathToPhoto": "junkValue",
            "location": {
                "lat": req.body.lat,
                "long": req.body.long
            },
            "category": req.body.category
        }))
            .save(function (error) {
                if (error) {
                    console.log("An error while saving the user: ");
                    var msg = "unititialized";
                    if (error.name == 'ValidationError') {
                        for (var field in error.errors) {
                            console.log(error.errors[field].message);
                            //I will only send one error at a time.
                            if (msg = "unititialized")
                                msg = error.errors[field].message;
                        }
                    }
                    return res.status(400).send({
                        "success": false,
                        "msg": msg
                    });
                }
                else {
                    return res.status(200).send({
                        "success": false,
                        "msg": "Your reporting is saved and will be processed soonish."
                    });
                }
            });
    }
}


exports.unimplemented = function (req, res) {
    return res.status(200).send({
        "success": false,
        "msg": "The service requested is not implemented."
    });
};