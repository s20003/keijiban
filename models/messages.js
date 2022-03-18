"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    messageSchema = new Schema({
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }
    );

module.exports = mongoose.model("Message", messageSchema);