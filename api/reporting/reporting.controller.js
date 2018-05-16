"use strict";

let Reporting = require("./reporting.module");
let Location = require("../location.module");
let Disk = require("../../utils/disk");

let hashCode = function (s) {
    return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

exports.post = function (req, res) {
    if (!req.body.description) {
        return res.status(400).send({
            "success": false,
            "msg": "Can you please add a description of what is happning?"
        });
    } else if (!req.body.photo) {
        return res.status(400).send({
            "success": false,
            "msg": "Add a photo you dumb ass."
        });
    } else {
        //I know the information i need is present in the body
        let loc = new Location({
            "lat": parseFloat(req.body.lat),
            "long": parseFloat(req.body.long),
            "address": req.body.address ? req.body.address : "The address was not set.",
            "phoneNumber": req.body.phoneNumber ? req.body.phoneNumber : "Phone number not set."
        });


        let hc = ""+ Math.abs(hashCode(req.body.description))+("_"+Math.abs(hashCode(""+Date.now())));

        let rep = new Reporting({
            "description": req.body.description,
            "pathToPhoto": `server_img/${hc}.jpeg`,
            "category": req.body.category ? req.body.category : "uncategorized",
            "status": "Da_Analizzare",
            "location": loc,
            "vlad_index": 1 + max_index
        });

        Disk.writeFileToDisk(`${hc}.jpeg`, req.body.photo);

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
                        max_index = max_index + 1;

                        return res.status(201).send({
                            "success": true,
                            "msg": "Report added successfuly.",
                            "data": { "id": rep.vlad_index }
                        });
                    }

                });
            }

        });
    }
};

exports.getByID = function (req, res) {
    //req.params.id is valid
    Reporting.findOne({ "vlad_index": req.params.id })
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
        "vlad_index": req.params.id
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
        where("status").regex(/[^(Rifiutata|Completata)]/igm).
        select("vlad_index").
        exec().
        then(

            (ok_array) => {
                let a = [];
                for (let i = 0; i < ok_array.length; i++)
                    a.push(ok_array[i].vlad_index);
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
            "1msg": "Send me a status fag."
        });
    else if (!Reporting.schema.paths.status.enumValues.includes(req.body.status)) {
        res.status(400).send({
            "success": false,
            "1msg": "Unfortunately " + req.body.status + " is not a valid status"
        });
    } else {
        Reporting.update({ "vlad_index": req.params.id }, { "status": req.body.status }).
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
