"use strict";

const router = require("express").Router(),
    homeRoutes = require("./homeRoutes"),
    threadRoutes = require("./threadRoutes");

router.use("/", homeRoutes);
router.use("/threads", threadRoutes);

module.exports = router;