var express = require('express');
var app = express();
var fs = require("fs");

app.delete('/:id', function (req, res) {
    fs.readFile("items.json", 'utf8', function (err, data) {
        var dataArray = JSON.parse(data);

        for (var i = 0; i < dataArray.length; i++) {
            if (parseInt(req.params.id) === dataArray[i].id) {
                dataArray.splice(i, 1);
                console.log(dataArray);
                fs.writeFile("items.json", JSON.stringify(dataArray), function (err, data) {
                    if (err) {
                        res.status(404).send(err);

                        return;
                    }
                });
                res.status(204).json();

                return;
            }
        }
        res.status(404).send();
    });
});

module.exports = app;