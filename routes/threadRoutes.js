"use strict";

const router = require("express").Router(),
    threadController = require("../controllers/threadController");

router.get("/:id", threadController.index, threadController.indexView);
// router.get("/new", threadController.new);
// router.post("/create", threadController.create, threadController.redirectView);
//router.get("/:id", threadController.show, threadController.showView);

module.exports = router;