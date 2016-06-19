var express = require('express');
var app = express();
var fs = require("fs");

app.get('/items', function (req, res) {
    fs.open("./items.json", 'a+', function (err, data) {
        if (err) {
            res.status(404).end(err);
        }
        fs.readFile("items.json", 'utf8', function (err, data) {
            if (data) {
                var dataArray = JSON.parse(data);

                console.log(data);
                res.status(200).json(dataArray);
            } else {
                res.status(200).send("[]");
            }
        });
    });
});

module.exports = app;

