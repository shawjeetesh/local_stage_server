const UserModal = require("../models/Users")

const VerifyToken = (req, res, next)=>{
    console.log("req.headers.authentication",req.headers.authorization);
    const {err, data} = new UserModal().verifyToken(req.headers.authorization)
    if(err){
        console.log("token", err);
        return res.status(401).send({status: "failed", message: "Token Expired or Invalid", token:"failed"})
    }
    req.headers._id = data.user_id
    next(null, true)
}

module.exports = {
    VerifyToken
}