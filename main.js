"use strict";

const express = require("express"),
    app = express(),
    router = require("./routes/index"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    expressValidator = require("express-validator"),
    passport = require("passport"),
    User = require("./models/user");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/keijiban")
    .then(() => {
        console.log("Successfully connected to MongoDB using Mongoose!");
    })
    .catch(error => {
        throw error;
    })

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
//app.set("token", process.env.TOKEN || "keijibanT0k3n");

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

app.use(express.static("public"));
app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(cookieParser("secretKeijiban123"));
app.use(
    expressSession({
        secret: "secretKeijiban123",
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
