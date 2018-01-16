"use strict";
var router = require("express").Router();
var controller = require("./reporting.controller");
var Utils = require("../../util/validID");

router.get("/", controller.unimplemented);
router.get("/:id", Utils.isValidID, controller.getByID); //Get information about a reporting
router.post("/", controller.post); //Push a new reporting to the database
router.put("/", controller.unimplemented);
router.delete("/:id", Utils.isValidID, controller.deleteByID); //Delete a reporting previously added

module.exports = router;