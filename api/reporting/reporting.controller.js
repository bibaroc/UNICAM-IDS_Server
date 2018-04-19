"use strict";

var Reporting = require("./reporting.module");
var Location = require("../location.module");

exports.post = function (req, res) {
    if (!req.body || !req.body.description || !req.body.lat || !req.body.long) {
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
        var loc = new Location({
            "lat": parseFloat(req.body.lat),
            "long": parseFloat(req.body.long),
            "address": req.body.address ? req.body.address : "The address was not set.",
            "phoneNumber": req.body.phoneNumber ? req.body.phoneNumber : "Phone number not set."
        })

        var rep = new Reporting({
            "description": req.body.description,
            "pathToPhoto": "junkValue",
            "category": req.body.category ? req.body.category : "uncategorized",
            "status": "Da_Analizzare",
            "location": loc,
        });

        loc.save(function (errorSavingLocation) {
            //If there is an error savig the location
            if (errorSavingLocation) {
                console.log(errorSavingLocation.message);
                //If it is a validation error
                if (errorSavingLocation.name == 'ValidationError') {
                    var msg = "unititialized";
                    for (var field in errorSavingLocation.errors) {
                        //I will only send one error at a time.
                        if (msg = "unititialized")
                            msg = errorSavingLocation.errors[field].message;
                    }
                    return res.status(400).send({
                        "success": false,
                        "msg": msg
                    });
                } else {
                    throw errorSavingLocation;
                    return res.status(500).send({
                        "success": false,
                        "msg": "Internal server error."
                    });
                }
            } else {
                //There is no error while saving the location.
                rep.save(function (errorSavingReporting) {
                    if (errorSavingReporting) {
                        console.log(errorSavingReporting.message);
                        //If there is an error i dont wont dangling documents.
                        Location
                            .remove({ "_id": loc._id })
                            .exec(function (error) {
                                if (error) {
                                    console.log(error);
                                }
                                if (errorSavingReporting.name == "ValidationError") {
                                    var msg = "unititialized";
                                    for (var field in errorSavingReporting.errors) {
                                        //I will only send one error at a time.
                                        if (msg = "unititialized")
                                            msg = errorSavingReporting.errors[field].message;
                                    }
                                    return res.status(400).send({
                                        "success": false,
                                        "msg": msg
                                    });
                                } else {
                                    return res.status(400).send({
                                        "success": false,
                                        "msg": errorSavingLocation.message
                                    });
                                }
                            });
                        //If there is an error i dont wont dangling documents.
                        // loc.remove(function(e))
                    } else {
                        //Everything is alright
                        return res.status(201).send({
                            "success": true,
                            "msg": "Report added successfuly."
                        });
                    }

                });
            }

        });
    }
};

exports.getByID = function (req, res) {
    console.log(req.params.id);
    //req.params.id is valid
    Reporting.findById(req.params.id)
        .populate({
            "path": "location",
            "select": "-_id -__v"
        })
        // .select("pathToPhoto description status date")
        .select("-_id -__v")
        .exec(function (errorLookingUpDB, result) {
            if (errorLookingUpDB) {
                console.log(errorLookingUpDB);
                return res.status(500).send({
                    "success": false,
                    "msg": "Something went terribly wrong during DB lookup."
                });
            } else {
                return res.status(result ? 200 : 404).send({
                    "success": true,
                    "msg": result ? "Here you are." : "There is no item matching search criteria.",
                    "data": result
                });
            }
        });

};

exports.deleteByID = function (req, res) {
    Reporting.update({
        "_id": req.params.id
    }, {
            "status": "Rifiutata"
        })
        .exec(function (err) {
            if (err) {
                return res.status(500).send({
                    "success": false,
                    "msg": "Unfortunatly something went wrong while updating the database."
                });
            } else {
                return res.status(200).send({
                    "success": true,
                    "msg": "Here you are little boy, the database was updated."
                });
            }
        });
};

exports.unimplemented = function (req, res) {
    return res.status(501).send({
        "success": false,
        "msg": "The service requested is not implemented."
    });
};


exports.get_all = function (req, res) {
    Reporting.
        find().
        //where("status").regex();
        select("_id").
        exec().
        then(

            (ok_array) => {
                let a = "";
                for (let i = 0; i < ok_array.length; i++)
                    a += ok_array[i]._id + (i === ok_array.length - 1 ? "" : ", ");
                return res.status(200).send({
                    "success": true,
                    "msg": "Here you go, have your results.",
                    "data": { "ids": a }
                });
            }

        ).
        catch(
            (error) => {
                return res.status(500).send({
                    "success": false,
                    "msg": "Unfortunatly something went wrong while looking up the database."
                });
            }
        );
};

exports.update_reporting = function (req, res) {

    if (!req.body || !req.body.status)
        res.status(400).send({
            "success": false,
            "1msg": "Unfortunately we could not find understand your request"
        });
    else if (!Reporting.schema.paths.status.enumValues.includes(req.body.status)) {
        res.status(400).send({
            "success": false,
            "1msg": "Unfortunately " + req.body.status + " is not a valid status"
        });
    } else {
        Reporting.update({ "_id": req.params.id }, { "status": req.body.status }).
            exec().
            then(
                () => { res.status(200).send({ "success": true, "msg": "ok" }); }
            ).
            catch(
                (error) => {
                    res.status(400).send({ "success": false, "msg": error.message });
                }
            );


    }


};