"use strict"

const Category = require("../models/category");
    // Thread = require("../models/thread");

module.exports = {
    index: (req, res, next) => {
        let categoryId = req.params.id;
        Category.findById(categoryId)
            .then(category => {
                res.locals.redirect = `${categoryId}`;
                res.locals.categories = category;
                next();
            });
    },
    indexView: (req, res) => {
        res.render("threads/index");
    }
};