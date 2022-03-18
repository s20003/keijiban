"use strict";

const router = require("express").Router(),
    threadController = require("../controllers/threadController");

router.get("/:id", threadController.index, threadController.indexView);

module.exports = router;