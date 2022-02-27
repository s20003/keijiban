"use strict";

const mongoose = require("mongoose"),
    Category = require("./models/category");

mongoose.connect("mongodb://localhost:27017/keijiban");
mongoose.connection;

var category = [
    {
        name: "ニュース"
    },
    {
        name: "学問"
    },
    {
        name: "食べ物"
    },
    {
        name: "趣味"
    },
    {
        name: "その他の雑談"
    },
];

Category.deleteMany()
    .exec()
    .then(() => {
        console.log("Category data is empty!")
    });

var commands = [];

category.forEach(c => {
    commands.push(
        Category.create({
            name: c.name
        })
    );
});

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });
