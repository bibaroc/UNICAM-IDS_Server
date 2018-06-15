"use strict";
var router = require("express").Router();
var controller = require("./operator.controller");
var Controll = require("../../utils/validID");
var Purge = require("../../utils/purge");

router.get("/", controller.get_all);
router.get("/request_free", controller.get_free_for_request);
router.get("/reporting_free", controller.get_free_for_reporting);
router.get("/:id", Controll.isValidID, controller.getByID);
router.post("/", Purge.replace, controller.post);
router.put("/:id", Purge.replace, Controll.isValidID, controller.unimplemented);
router.delete("/:id", Controll.isValidID, controller.deleteByID);

module.exports = router;