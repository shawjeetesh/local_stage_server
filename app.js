"use strict";
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const fs =require("fs");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

require('dotenv').config()

const AuthRoute  = require("./routes/auth");
const MainRoute  = require("./routes/main");
const AdminRoute  = require("./routes/admin/index");
const ContactRouter  = require("./routes/main/Contact");
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(logger('common', {
//   stream: fs.createWriteStream('./access.log', {flags: 'a'})
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.set('strictQuery', true);
// process.env.DB_LINK ||
mongoose.connect(process.env.DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if(error)
    console.log(error);
    else
    console.log("DB Connected");
});


app.use("/auth", AuthRoute);
app.use("/admin", AdminRoute);
app.use("/user", MainRoute);
app.use("/contact", ContactRouter);
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
