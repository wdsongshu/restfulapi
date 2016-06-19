var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据

var addUser = require('./addItems');
var deleteUser = require('./deleteItems');
var listOneUsers = require('./listOneItems');
var listUsers = require('./listItems');
var updataUsers = require('./updateItems');


app.use('/', addUser);
app.use('/', deleteUser);
app.use('/', listUsers);
app.use('/', listOneUsers);
app.use('/', updataUsers);
app.use(bodyParser.json({ type: 'json/*' }))

//捕捉到error并转到处理程序
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//生产用户程序，并泄露给用户
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, function () {

    console.log("连接成功！");
});

