"use strict";

const router = require("express").Router(),
    messageController = require("../controllers/messageController");

router.get("/", messageController.index, messageController.indexView);
router.get("/new", messageController.new);
router.post("/create", messageController.create, messageController.redirectView);

module.exports = router;