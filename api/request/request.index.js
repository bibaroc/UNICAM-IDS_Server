"use strict";
var router = require("express").Router();
var controller = require("./request.controller");
var Controll = require("../../utils/validID");
var Purge = require("../../utils/purge");
var Geo = require("../../utils/hasValidGeo");

router.get("", controller.get_all);
router.get("/:id", Controll.isValidID, controller.get_by_ID);
router.post("", Purge.replace, Geo.isValidAddress, Geo.isValidGeo, controller.make_new);
router.put("/:id", Purge.replace, Controll.isValidID, controller.update_request);
router.delete("/:id", Controll.isValidID, controller.delete_by_id);

module.exports = router;