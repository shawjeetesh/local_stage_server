const Route = require("express").Router();


Route.use("/",(req, res, next)=>{
    return res.send("success")
});

module.exports = Route;