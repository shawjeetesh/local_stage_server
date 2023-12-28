const UserModal = require("../models/Users")

const VerifyToken = async(req, res, next)=>{
    
    console.log("req.headers.authentication",req.headers.authorization);
    


  
    const {err, data} = await UserModal().verifyToken(req.headers.authorization)
    if(err){
        console.log("token", err);
        return res.status(401).send({status: "failed", message: "Token Expired or Invalid", token:"failed"})
    }
    console.log("token", data);
    req.headers._id = data.uid
    next(null, true)
}

module.exports = {
    VerifyToken
}