const express = require('express')
const Router = express.Router();
const UsersModals = require("../../models/Users")

Router.get("/",(req, res)=>{
    // const user = await UsersModals.findOne({email: req.body.eamil});
    return res.send("forget-pass");
})

Router.put("/", async(req, res)=>{
    const user = await UsersModals.findOne({email: req.body.email});
    console.log(user)
    if(!user){
        res.status(403).send({status:"failed", message:"Wrong Email Address"})
    }
    // user.resetPasswordToken = Math.random()*10000
    user.resetPasswordToken = "9876"
    const userSaved = await user.save()
    if(!userSaved)
    return res.status(400).send({status: "failed", message:"Failed to save token", data: userSaved});

    return res.send({status:"success", message:"Please Check Email to For OTP"})
})

Router.put("/check-otp-verify", async(req, res)=>{
    const user = await UsersModals.findOne({email: req.body.email});
    console.log(user)
    if(!user.resetPasswordToken || user.resetPasswordToken === null ){
        return res.status(403).send({status:"failed", message:"Wrong Email Address"})
    }
    if(user.resetPasswordToken != req.body.otp)
    return res.status(403).send({status:"failed", message:"Wrong Otp Given"})

    return res.send({status:"success", message:"Please Reset Password", p_token: user.resetPasswordToken  })
})

module.exports = Router;