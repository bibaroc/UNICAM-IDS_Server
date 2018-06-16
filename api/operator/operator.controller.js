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
    Operator
        .findOne()
        .where({ "vlad_index": req.params.id })
        .exec()
        .then(
            (operator) => {
                if (!operator)
                    return res.status(404).send({
                        "success": false,
                        "msg": "We could not find the operator: " + req.params.id + "."
                    });
                let requests = operator.assigned_requests,
                    reportings = operator.assigned_reportings;

                operator.status = "Disabilitato";
                operator.assigned_requests = [];
                operator.assigned_reportings = [];

                operator.save((error_saving_operator) => {
                    if (error_saving_operator)
                        return res.status(500).send({
                            "success": false,
                            "msg": "We had troubes saving changes to the database, please dont retry"
                        });
                    Reporting
                        .find()
                        .where({ "vlad_index": reportings })
                        .exec()
                        .then(
                            (results) => { for (let i = 0; i < results.length; i++)results[i].status = "Da_Analizzare", results[i].save(); }
                        );
                    Request
                        .find()
                        .where({ "vlad_index": requests })
                        .exec()
                        .then(
                            (results) => { for (let i = 0; i < results.length; i++)results[i].status = "Da_Analizzare", results[i].save(); }
                        );
                    return res.status(200).send({
                        "success": true,
                        "msg": "Changes are persisted."
                    });
                });
            }
        ).catch(
            (error) => {
                return res.status(500).send({
                    "success": false,
                    "msg": "Unfortunatly something went wrong while updating the database."
                });
            }
        );
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
            "msg": "Unfortunately we could not find understand your request"
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

exports.assign_task = function (req, res) {

    if (!req.body || !req.body.task) {
        return res.status(400).send({
            "success": false,
            "msg": "Please specify what task to assign to the operator."
        });
    }
    let reportingQuery = Reporting
        .findOne()
        .select("vlad_index")
        .where({ "vlad_index": req.body.task })
        .exec();
    let requestQuery = Request
        .findOne()
        .where({ "vlad_index": req.body.task })
        .exec();
    Operator
        .findOne()
        .where({ "vlad_index": req.params.id })
        .exec()
        .then(
            (operator) => {
                if (!operator)
                    return res.status(200).send({
                        "success": true,
                        "msg": "Operator with code: " + req.params.id + " not found."
                    });
                reportingQuery.then(
                    (reporting) => {
                        if (reporting) {
                            if (operator.assigned_reportings.indexOf(reporting.vlad_index) < 0 && operator.assigned_reportings.length < 5) {
                                operator.assigned_reportings.push(reporting.vlad_index);
                                operator.save((error_saving) => {
                                    if (error_saving)
                                        return res.status(400).send({
                                            "success": false,
                                            "msg": error
                                        });
                                    reporting.status = "Accettata";
                                    reporting.save((error) => { if (error) throw error; });
                                    return res.status(200).send({
                                        "success": true,
                                        "msg": "Task " + reporting.vlad_index + " assigned to " + operator.vlad_index + "."
                                    });
                                });
                            } else
                                return res.status(400).send({
                                    "success": false,
                                    "msg": "We had troubles assigning the reporting to the operator"
                                });
                        } else {
                            requestQuery.then(
                                (request) => {
                                    if (request) {
                                        if (operator.assigned_requests.indexOf(request.vlad_index) < 0 && operator.assigned_requests.length < 5) {
                                            operator.assigned_requests.push(request.vlad_index);
                                            operator.save((error_saving) => {
                                                if (error_saving)
                                                    return res.status(400).send({
                                                        "success": false,
                                                        "msg": error
                                                    });
                                                request.status = "Accettata";
                                                request.save((error) => { if (error) throw error; });
                                                return res.status(200).send({
                                                    "success": true,
                                                    "msg": "Task " + request.vlad_index + " assigned to " + operator.vlad_index + "."
                                                });
                                            });
                                        } else
                                            return res.status(400).send({
                                                "success": false,
                                                "msg": "We had troubles assigning the request to the operator"
                                            });
                                    } else {
                                        return res.status(400).send({
                                            "success": false,
                                            "msg": "We could not find the task you wanted to give."
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        )
        .catch((error) => {
            return res.status(400).send({
                "success": false,
                "msg": error
            });
        });
};
