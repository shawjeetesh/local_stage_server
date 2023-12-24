const UserModal = require("../../models/Users");

const Route = require("express").Router()
// const admin = require("../../config/firebaseConfig");
const { SigninController } = require("../../controller/auth/index");

Route.post("/", SigninController)
Route.get("/", (req, res, next)=>{
    // const {email, phone, password} = req.body
    console.log(req);
    return res.send("Success")
})

module.exports = Route