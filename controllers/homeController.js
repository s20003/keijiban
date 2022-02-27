"use strict";

const Category = require("../models/category");

module.exports = {
    index: (req, res, next) => {
        Category.find()
            .then(categories => {
                res.locals.categories = categories
                next();
            })
            .catch(error => {
                console.log(`Error fetching categories: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("index");
    }
}