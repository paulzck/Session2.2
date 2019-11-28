"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var app = express();
var port = process.env.PORT || '6003';
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.write('Hello world');
    res.end();
});
app.get('/:name', function (req, res) {
    res.render('hello.ejs', { name: req.params.name });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
app.get('/metrics.json', function (req, res) {
    metrics_1.MetricsHandler.get(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
