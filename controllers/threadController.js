"use strict"

const Category = require("../models/category"),
    Thread = require("../models/thread");

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
    },
    new: (req, res) => {
        res.render("threads/new");
    },
    create: (req, res, next) => {
        //let categoryId = req.params.id;
        let threadParams = {
            title: req.body.title,
            message: req.body.message
        };
        Thread.create(threadParams)
            .then(thread => {
                res.locals.redirect = "/";
                res.locals.threads = thread;
                next();
            })
            .catch(error => {
                console.log(`Error saving thread: ${error.message}`);
                next(error);
            });
    },
    // show: (req, res, next) => {
    //     let threadId = req.params.id;
    //     Thread.findById(threadId)
    //         .then(thread => {
    //             res.locals.thread = thread;
    //             next();
    //         })
    //         .catch(error => {
    //             console.log(`Error fetching thread by ID: ${error.message}`);
    //             next(error);
    //         });
    // },
    // showView: (req, res) => {
    //     res.render("threads/show");
    // },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    }
};