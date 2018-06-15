"use strict";

let Operator = require("./operator.module");
let Reporting = require("./../reporting/reporting.module");
let Request = require("./../request/request.module");

exports.post = function (req, res) {
    if (!req.body.name || !req.body.last_name) {
        return res.status(400).send({
            "success": false,
            "msg": "An operator should realy have a name and a last_name."
        });
    } else {

        var oper = new Operator({
            "name": req.body.name,
            "last_name": req.body.last_name,
            "status": "Abilitato",
            "assigned_requests": [],
            "assigned_reportings": [],
            "vlad_index": 1 + max_index
        });

        oper.save(function (errorSavingLocation) {

            if (errorSavingLocation) {
                console.log(errorSavingLocation.message);
                return res.status(500).send({ "success": false, "msg": errorSavingLocation.message });
            } else {

                max_index = max_index + 1;
                return res.status(201).send({
                    "success": true,
                    "msg": "Operator added successfuly.",
                    "data": { "id": oper.vlad_index }
                });
            }

        });
    }


};

exports.getByID = function (req, res) {

    Operator.findOne({ "vlad_index": req.params.id })
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
    Operator.update({
        "vlad_index": req.params.id
    }, {
            "status": "Disabilitato"
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
    Operator.
        find().
        where("status").ne("Disabilitato").
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

exports.get_free_for_reporting = function (req, res) {
    Operator.
        find().
        where("status").ne("Disabilitato").
        select("vlad_index assigned_reportings").
        exec().
        then(
            (ok_array) => {
                let a = [];
                for (let i = 0; i < ok_array.length; i++)
                    if (ok_array[i].assigned_reportings.length < 5)
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

exports.get_free_for_request = function (req, res) {
    Operator.
        find().
        where("status").ne("Disabilitato").
        select("vlad_index assigned_requests").
        exec().
        then(
            (ok_array) => {
                let a = [];
                for (let i = 0; i < ok_array.length; i++)
                    if (ok_array[i].assigned_requests.length < 5)
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

exports.update = function (req, res) {

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