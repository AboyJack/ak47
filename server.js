const express = require('express');
const compression = require('compression');
const webpack = require('webpack');
const bodyParser = require("body-parser");
const mysql      = require('mysql');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

var data = { "name": "Test", "age": "19" };
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(compression());


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/', function(req, res) {
  console.log('get..........');
  console.log(req.query);
  if (req.query && req.query.callback) {  
    var str = req.query.callback + "(" + JSON.stringify(data) + ")"; //jsonp    
    console.log('jsonp: '+str);  
    res.end(str);  
  } else {
    console.log('json: '+JSON.stringify(data));  
    res.end(JSON.stringify(data));  
  }
});

app.post('/user', function(req, res) {
  console.log('post............');
  console.log(req.body);  
  console.log('json: '+JSON.stringify(data));  
  res.end(data);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});