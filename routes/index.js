"use strict";

const router = require("express").Router(),
    homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);

module.exports = router;