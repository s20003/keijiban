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
                required: true,
                unique: true
            }
        },
        {
            timestamps: true
        }
    );

userSchema.virtual("name").get(function () {
    return `${this.userName}`
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "loginId"
});

module.exports = mongoose.model("user", userSchema);