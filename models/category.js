"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    categorySchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        }
    });

module.exports = mongoose.model("Category", categorySchema);