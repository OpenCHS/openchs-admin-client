var createError = require('http-errors');
var express = require('express');
var proxy = require('http-proxy-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var serverRequests = require('./serverRequests');
var mainRouter = require('./mainRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

serverRequests.defaults.baseUrl = 'http://localhost:8021';

app.use('/chs-api', proxy({target: 'http://localhost:8021', changeOrigin: true, pathRewrite: {'^/chs-api': ''}}));
app.use('/admin-backend', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  console.log('error', error);

  res.status(error.status || 500);
  res.send({error});
});

module.exports = app;
