"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    passportLocalMongoose = require("passport-local-mongoose"),
    userSchema = new Schema({
            loginId: {
                type: String,
                required: true,
                unique: true
            },
            userName: {
                type: String,
                required: true
            },
            // password: {
            //     type: String,
            //     required: true
            // }
        },
        {
            timestamps: true
        }
    );

userSchema.plugin(passportLocalMongoose, {
    usernameField: "loginId"
});

module.exports = mongoose.model("User", userSchema);