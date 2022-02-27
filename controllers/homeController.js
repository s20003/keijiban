"use strict";

module.exports = {
    index: (req, res) => {
        res.render("index", {
            categoryList: [
                {_id: 1, name: "test1"},
                {_id: 2, name: "test2"},
                {_id: 3, name: "test3"},
                {_id: 4, name: "test4"},
                {_id: 5, name: "test5"}
            ]
        });
    }
}