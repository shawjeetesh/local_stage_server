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
    user.resetPasswordToken = new UsersModals().createToken(user._id)
    const userSaved = await user.save()
    if(!userSaved)
    return res.status(400).send({status: "failed", message:"Failed to save token", data: userSaved});

    return res.send({status:"success", message:"Please Check Email to Verify"})
})

Router.post("/check-token-verify", async(req, res)=>{
    const user = await UsersModals.findOne({email: req.body.email});
    console.log(user)
    if(!user.resetPasswordToken || user.resetPasswordToken === null ){
        res.status(403).send({status:"failed", message:"Wrong Email Address"})
    }
    return res.send({status:"success", message:"Please Reset Password", p_token: user.resetPasswordToken  })
})

module.exports = Router;