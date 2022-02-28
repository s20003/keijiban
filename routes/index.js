"use strict";

const router = require("express").Router(),
    homeRoutes = require("./homeRoutes"),
    threadRoutes = require("./threadRoutes"),
    userRoutes = require("./userRoutes");

router.use("/", homeRoutes);
router.use("/threads", threadRoutes);
router.use("/users", userRoutes);

module.exports = router;