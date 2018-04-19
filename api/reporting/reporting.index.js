"use strict";
var router = require("express").Router();
var controller = require("./reporting.controller");
var Controll = require("../../utils/validID");
var Purge = require("../../utils/purge");

router.get("/", controller.get_all);
router.get("/:id", Controll.isValidID, controller.getByID); //Get information about a reporting
router.post("/", Purge.replace, controller.post); //Push a new reporting to the database
router.put("/", controller.unimplemented);
router.delete("/:id", Controll.isValidID, controller.deleteByID); //Delete a reporting previously added

module.exports = router;