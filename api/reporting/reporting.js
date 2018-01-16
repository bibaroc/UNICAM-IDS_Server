"use strict";
var router = require("express").Router();
var controller = require("./reporting.controller");

router.get('/', controller.unimplemented); 
router.get('/:id', controller.getByID);
router.post('/', controller.post);
router.put('/', controller.unimplemented);
router.delete('/', controller.unimplemented);

module.exports = router;