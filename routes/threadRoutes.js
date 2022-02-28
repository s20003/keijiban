"use strict";

const router = require("express").Router(),
    threadController = require("../controllers/threadController");

router.get("/:id", threadController.index, threadController.indexView);
router.get("/:id/new", threadController.new);
router.post("/:id/create", threadController.create, threadController.redirectView);
//router.get("/:id", threadController.show, threadController.showView);

module.exports = router;