var express = require('express');
var app = express();
var fs = require("fs");
var item;

app.post('/:id', function (req, res) {
    fs.readFile("items.json", 'utf8', function (err, data) {
        if (err) {
            res.send(err);
        } else {
            var dataArray = JSON.parse(data);
            for (var i = 0; i < dataArray.length; i++) {
                if (parseInt(req.params.id) === dataArray[i].id) {
                    item = dataArray.slice(i, i + 1);
                    console.log(item);
                    res.status(200).json(item);

                    return;
                }
            }
            res.status(404).json();
        }
    });
});

module.exports = app;

