const Route = require("express").Router();
const loginRoute = require("./login");
const signUpRoute = require("./signup");
const forgetPasswordRoute = require("./forgetPassword");
const resetPasswordRoute = require("./resetPassword");

Route.use("/forget-password",forgetPasswordRoute);
Route.use("/reset-password",resetPasswordRoute);
Route.use("/login",loginRoute);
Route.use("/signup",signUpRoute);

module.exports = Route;