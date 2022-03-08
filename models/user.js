"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    bcrypt = require("bcrypt"),
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

// userSchema.pre("save", function (next) {
//     let user = this;
//     bcrypt
//         .hash(user.password, 10)
//         .then(hash => {
//             user.password = hash;
//             next();
//         })
//         .catch(error => {
//             console.log(`Error in hashing password: ${error.message}`);
//             next(error);
//         });
// });

// userSchema.methods.passwordComparison = function (inputPassword) {
//     let user = this;
//     return bcrypt.compare(inputPassword, user.password);
// };
//
// userSchema.virtual("name").get(function () {
//     return `${this.userName}`
// });

userSchema.plugin(passportLocalMongoose, {
    usernameField: "loginId"
});

module.exports = mongoose.model("User", userSchema);