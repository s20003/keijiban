"use strict";

const Message = require("../models/messages");

module.exports = {
    index: (req, res, next) => {
        Message.find()
            .then(message => {
                res.locals.message = message;
                next();
            })
            .catch(error => {
                console.log(`Error fetching messages: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("messages/index");
    },
    new: (req, res) => {
        res.render("messages/new");
    },
    create: (req, res, next) => {
        let messageParams = {
                title: req.body.title,
                message: req.body.message
            };
        Message.create(messageParams)
            .then(message => {
                res.locals.redirect = "/";
                res.locals.message = message;
                next();
            })
            .catch(error => {
                console.log(`Error saving message: ${error.message}`);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    }
};