"use strict";
var router = require("express").Router();
var controller = require("./reporting.controller");
var Controll = require("../../utils/validID");
var Purge = require("../../utils/purge");
var Geo = require("../../utils/hasValidGeo");

router.get("/", controller.get_all);
router.get("/:id", Controll.isValidID, controller.getByID); 
router.post("/", Purge.replace, Geo.isValidGeo, controller.post); //Push a new reporting to the database
router.put("/:id", Purge.replace, Controll.isValidID, controller.update_reporting);
router.delete("/:id", Controll.isValidID, controller.deleteByID); 

module.exports = router;
