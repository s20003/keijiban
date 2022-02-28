"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    threadSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model("Thread", threadSchema);