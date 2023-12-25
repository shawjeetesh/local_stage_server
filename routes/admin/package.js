const UserModal = require("../../models/Users")

const PackageCreateController =  async(req, res, next)=>{
    const {title , Price} = req.body
    // console.log("body",req.body);

    if(!email){
        return res.status(403).json({status:"failed", message:"Email is missing"})
    }
    
    if(!password){
        return res.status(403).json({status:"failed", message:"Password is missing"})
    }

    
    const user = await UserModal.findOne({email: email})
    if(!user){
        return res.status(401).send({status:"failed", message:"Wrong Email or Password"})
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

}


module.exports = {
    PackageCreateController
}