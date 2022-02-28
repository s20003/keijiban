"use strict";

const User = require("../models/user"),
    passport = require("passport"),
    { check, validationResult} = require("express-validator"),
    getUserParams = body => {
        return {
            loginId: body.loginId,
            userName: body.userName,
            password: body.password
        }
    };

module.exports = {
    index: (req, res, next) => {
        User.find()
            .then(user => {
                res.locals.users = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("users/index");
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        if (req.skip) return next();
        const newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `${user.loginId}'s account created successfully!`);
                res.locals.redirect = "/users";
                next();
            } else {
                console.log("error");
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    // show: (req, res, next) => {
    //     let userId = req.params.id;
    //     User.findById(userId)
    //         .then(user => {
    //             res.locals.users = user;
    //             next();
    //         })
    //         .catch(error => {
    //             console.log(`Error fetching user by ID: ${error.message}`);
    //             next(error);
    //         });
    // },
    // showView: (req, res) => {
    //     res.render("users/show");
    // },
    login: (req, res) => {
        res.render("users/login");
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    validate: async (req, res, next) => {
        await check("password", "Password cannot be empty")
            .notEmpty()
            .run(req)

        const validationResults = validationResult(req);
        if (!validationResults.isEmpty()) {
            let messages = validationResults.array().map(e => e.msg);
            req.skip = true;
            req.flash("error", messages.json(" and "));
            res.locals.redirect = "/users/new";
            next();
        } else {
            next();
        }
    },
    logout: (req, res, next) => {
        req.logout();
        req.locals.redirect = "/";
        next();
    }


}