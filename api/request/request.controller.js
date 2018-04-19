"use strict";

var Request = require("./request.module");
var Location = require("../location.module");

exports.make_new = function (req, res) {
    //I know the information i need is present in the body
    var loc = new Location({
        "lat": parseFloat(req.body.lat),
        "long": parseFloat(req.body.long),
        "address": req.body.address,
        "phoneNumber": req.body.phone
    })

    var rep = new Request({
        "status": "Da_Analizzare",
        "location": loc,
        "preferred_date": req.body.pref || Date.now() + (1000 * 60 * 60 * 24 * 2)
    });

    loc.save(function (errorSavingLocation) {

        if (errorSavingLocation) {

            if (errorSavingLocation.name == 'ValidationError') {
                var msg = "unititialized";
                for (var field in errorSavingLocation.errors) {

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

                } else {
                    return res.status(201).send({
                        "success": true,
                        "msg": "Report added successfuly.",
                        "data": { "id": rep._id }
                    });
                }

            });
        }

    });

};

exports.get_by_ID = function (req, res) {
    Request.findById(req.params.id)
        .populate({
            "path": "location",
            "select": "-_id -__v"
        })
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

exports.delete_by_id = function (req, res) {
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

exports.get_all = function (req, res) {
    Request.
        find().
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

exports.update_request = function (req, res) {

    if (!req.body || !req.body.status)
        res.status(400).send({
            "success": false,
            "1msg": "Unfortunately we could not find understand your request"
        });
    else if (!Request.schema.paths.status.enumValues.includes(req.body.status)) {
        res.status(400).send({
            "success": false,
            "1msg": "Unfortunately " + req.body.status + " is not a valid status"
        });
    } else {
        Request.update({ "_id": req.params.id }, { "status": req.body.status }).
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