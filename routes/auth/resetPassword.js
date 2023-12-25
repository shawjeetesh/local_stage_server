const Router = require('express').Router();
const UsersModals = require("../../models/Users")


Router.put("/", async(req, res)=>{
    const user = await UsersModals.findOne({email: req.body.email});
    console.log(user)
    if(!user){
        res.status(403).send({status:"failed", message:"Wrong Email Address"})
    }
    if(user.resetPasswordToken !== req.body.otp){
        res.status(403).send({status:"failed", message:"Invalid OTP"})

    }
    user.password = user.hashPassword(req.body.new_password);
    // user.resetPasswordToken = Math.random()*10000
    
    const userSaved = await user.save()
    if(!userSaved)
    return res.status(400).send({status: "failed", message:"Failed to save token", data: userSaved});

    return res.send({status:"success", message:"Password Reset Successfully"})
})


module.exports = Router