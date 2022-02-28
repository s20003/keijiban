"use strict";

const router = require("express").Router(),
    homeRoutes = require("./homeRoutes"),
    errorRoutes = require("./errorRoutes"),
    threadRoutes = require("./threadRoutes"),
    userRoutes = require("./userRoutes");

router.use("/", homeRoutes);
router.use("/threads", threadRoutes);
router.use("/users", userRoutes);
router.use("/", errorRoutes);

module.exports = router;