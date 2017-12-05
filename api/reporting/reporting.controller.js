"use strict";

var Reporting = require("./reporting.module");

exports.post = function (req, res) {
    switch (undefined) {
        case req.body:
            return res.status(400).send({
                "success": false,
                "msg": "We were not able to decode the information sent to us."
            });
            break;
        case req.body.description:
            return res.status(400).send({
                "success": false,
                "msg": "Can you please add a description?"
            });
            break;
        case req.body.lat || req.body.long:
            return res.status(400).send({
                "success": false,
                "msg": "We could realy use your information in orded to provide the best service possible."
            });
            break;
        //TODO: replace with multer photo 
        // case req.body.pathToPhoto:
        //     return res.status(400).send({
        //         "success": false,
        //         "msg": "Could you please send us a photo of the reporting?"
        //     });
        //     break;
        default:
            var reporting = new Reporting({
                "description": req.body.description,
                "pathToPhoto": "junkValue",
                "location": {
                    "lat": parseInt(req.body.lat),
                    "long": parseInt(req.body.long)
                },
                "category": ""
            });
            if (!req.body.category) {
                reporting.category = "uncategorized";
            }
            else if (Reporting.schema.path("category").enumValues.indexOf(req.body.category) === -1) {
                return res.status(400).send({
                    "success": false,
                    "msg": "The desired category is not available."
                });
            } else {
                reporting.category = req.body.category;
            }
            reporting.save(function (error) {
                if (error) {
                    console.log(serializeError(error));
                    return res.status(500).send({
                        "success": false,
                        "msg": error.message
                    });
                } else {
                    return res.status(200).send({
                        "success": false,
                        "msg": "Your reporting is saved and will be processed soonish."
                    });
                }
            });
            break;
    }
};

exports.unimplemented = function (req, res) {
    return res.status(200).send({
        "success": false,
        "msg": "The service requested is not implemented."
    });
};