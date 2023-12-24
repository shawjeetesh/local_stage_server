const Route = require("express").Router();
const UserModal = require("../../models/Users");
const loginRoute = require("./login");
// const signUpRoute = require("./signup");
// const forgetPasswordRoute = require("./forgetPassword");
const main = require("./main");

// Route.use("/forget-password",forgetPasswordRoute);
Route.post("/login",async(req,res,next)=>{
    const {email , password} = req.body
    console.log("body",req.body);

    if(!email){
        return res.status(422).json({status:"failed", message:"Email is missing"})
    }
    
    if(!password){
        return res.status(422).json({status:"failed", message:"Password is missing"})
    }

    
    const user = await UserModal.findOne({email: email, user_type:"admin"})
    if(!user){
        return res.status(422).send({status:"failed", message:"Wrong Email or Password"})
    }
    console.log(password,user.password)
    if(user.comparePassword(password,user.password)){
        // const fuser =  await admin.auth().getUserByEmail(email)
        let token = user.createToken(user._id)
        // console.log('fuser', token)
        res.status(200).send({status: "success", message:"Successfully Logged In", data: {token: token, name: user.name,FirebaseToken:null}})
        return await UserModal.findByIdAndUpdate(user.id, {$set: {token: [ ...user.token, token] }})
    }
    return res.status(401).send({status:"failed", message:"Wrong Email or Password"})
});
// Route.use("/signup",signUpRoute);

Route.use("/main",main);
Route.get("/",async(req,res)=>{
    const users = await UserModal.find({})
    console.log({users});
    return res.send('admin')
})

module.exports = Route;