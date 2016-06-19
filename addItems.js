var express = require('express');
var app = express();
var fs = require("fs");
var newId;

app.post('/add', function (req, res) {
    fs.readFile("items.json", 'utf8', function (err, data) {
        if (err) {
            res.status(404).end(err);
        } else if (!(typeof(req.body.name) === "string") || !(typeof(req.body.barcode) === "string") || !(typeof(req.body.unit) === "string")
            || !(typeof(req.body.price) === "number")) {
            res.status(401).send();
        } else {
            var dataArray = JSON.parse(data);
            fs.readFile("id.json", 'utf8', function (err, data0) {
                if (err) {
                    res.status(404).end(err);
                } else {
                    var data0Array = JSON.parse(data0);
                    newId = ++data0Array.id;
                    fs.writeFile("id.json", JSON.stringify(data0Array), function (err, data0) {
                        if (err) {
                            res.status(404).end(err);

                            return;
                        }
                    });
                    var addItem = {
                        "id": newId,
                        "barcode": req.body.barcode,
                        "name": req.body.name,
                        "unit": req.body.unit,
                        "price": req.body.price
                    };
                    dataArray.push(addItem);
                    console.log(addItem);
                    fs.writeFile("items.json", JSON.stringify(dataArray), function (err, data) {
                        if (err) {
                            res.status(404).end(err);

                            return;
                        }
                        res.status(201).json(addItem);
                    });
                }
            });
        }
    });
});

module.exports = app;

