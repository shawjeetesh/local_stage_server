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
// var admin = require("firebase-admin");

// var serviceAccount = require("./local-stage-1d39c-firebase-adminsdk-75rg6-29cedc9c56.json");


require('dotenv').config()

// admin.initializeApp({
//   credential: admin.credential.cert({
//     clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey:process.env.FIREBASE_PRIVATE_KEY,
//     projectId:process.env.FIREBASE_PROJECT_ID,
//     "type": process.env ,
//     "project_id":  process.env.FIREBASE_TYPE ,
//     "private_key_id": process.env.FIREBASE_PROJECT_ID ,
//     "private_key": process.env.FIREBASE_PRIVATE_KEY_ID
//     ,
//     "client_email": process.env.FIREBASE_PRIVATE_KEY ,
//     "client_id":  process.env.FIREBASE_CLIENT_EMAIL ,
//     "auth_uri":  process.env.FIREBASE_CLIENT_ID,
//     "token_uri":  process.env.FIREBASE_AUTH_URL ,
//     "auth_provider_x509_cert_url":  process.env.FIREBASE_AUTH_PROVIDER_CERT_URL ,
//     "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL ,
//     "universe_domain":  process.env.FIREBASE_UNIVERSE_DOMAIN ,
//   })
// });

// admin.auth()
// .verifyIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9jYWwtc3RhZ2UtMWQzOWMiLCJhdWQiOiJsb2NhbC1zdGFnZS0xZDM5YyIsImF1dGhfdGltZSI6MTcwMzUwNzk0MCwidXNlcl9pZCI6InpDZEJ3ZjBMY0tNalpzeUROdlNUcUNqQ3pLODIiLCJzdWIiOiJ6Q2RCd2YwTGNLTWpac3lETnZTVHFDakN6SzgyIiwiaWF0IjoxNzAzNTA3OTQwLCJleHAiOjE3MDM1MTE1NDAsInBob25lX251bWJlciI6Iis5MTgyNDA2MTMxODgiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis5MTgyNDA2MTMxODgiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.hoFngJ_I8zDAsogrzJ57GvuZd7NigtGZOdE161WG0BhZSv1i-X5SOL6Zmft1GBybc47wk4mH1n8VmGYXcTE-NkOY1tY5kU4Aw4dqUeSKHFVeV_YdK4CnX7vPVWtZdVb3_M0vsYFqdzAOvDq6phpU7pPqIm5wHk80OTi6NGNhMvVeiDhAE_n9H5j_fiwHjekI2Nd2g7B6z_f1kV7wIIIK7noETZyjFBgpY2OA0YzaOuRGanL3OdOBVT4NnZ5HccsVIwEFjaB2g5i3y06eN-MsxxB4XV7rgQ42mxmu4gRUyB1id_u3wF_jH4F3tipcLjC9KF_CpTtQ2zibn1ymRLtO0w")
// .then(async(res)=>{
//   //  console.log({res})
//    await admin.auth().updateUser(res.uid,{
//     displayName:"test user"
//   })
//   const res2 = await admin.auth().getUser(res.uid)
//   console.log({res2})
//   })

// const AuthRoute  = require("./routes/auth");
// const MainRoute  = require("./routes/main");
const AdminRoute  = require("./routes/admin/index");
// const ContactRouter  = require("./routes/main/Contact");
// const indexRouter = require('./routes/index');
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


// app.use("/auth", AuthRoute);
app.use("/admin", AdminRoute);
// app.use("/user", MainRoute);
// app.use("/contact", ContactRouter);
// app.use('/', indexRouter);
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
