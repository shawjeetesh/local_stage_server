const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const { notify } = require('../routes/admin/login');
const firebaseAuth = require('../config/firebaseAuth');
const Schema = mongoose.Schema;
const secretKey =  fs.readFileSync("./cert/private.pem")
const publicKey =  fs.readFileSync("./cert/public.pem")
console.log("publicKey", publicKey)

const UserSchema = new Schema({
    firebase_id:{
        type:String,
        require: true,
        unique:[true,  "firebase id is now unique."],
    },
    name: {
        type:String,
        require: true,
        min: 4,
        max: 50,
    },
    email:{
        type:String,
        require: false,
        unique:[true,  "Email must be unique"],
        min: 4,
        max: 100,
    },
    phone_code:{
        type:String,
        require: true,
        min: 1,
        max: 20,
        default:"+91"
    },
    phone_number:{
        type:String,
        require: true,
        min: 10,
        unique:[true, "Phone Number must be unique"],
        max: 11
    },
    profile_image:{
        type:String,
        default: null,
    },
    user_type:{
        type:String,
        default: "client",
    },
    plan:{
        type:String,
        
        default: null,
    },
    resetPasswordToken:{
        type:String ,
        default: "",
    },
    resetPasswordTokenVerified:{
        type:Boolean,
        default:false
    },
    device_token:{
        type:String,
        default: "",
    },
    
},{
    timestamps:true
});

UserSchema.methods.hashPassword = (password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(10))
UserSchema.methods.comparePassword = (password, hash)=> bcrypt.compareSync(password, hash)
UserSchema.methods.createToken = (id)=> jwt.sign({
    user_id: id,
    time: Date.now()
  }, secretKey,{
      algorithm: "RS256"
  }
  );
UserSchema.methods.verifyToken = async (token)=> {
    try {
        
        const data = await firebaseAuth.auth().verifyIdToken(token)
    
        return {data}
    } catch (err) {
        return {err}
    }
};

// // Generating Password Reset Token
// userSchema.methods.getResetPasswordToken = function () {
//     // Generating Token
//     const resetToken = crypto.randomBytes(20).toString("hex");
  
//     // Hashing and adding resetPasswordToken to userSchema
//     this.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");
  
//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
//     return resetToken;
//   };

const UserModal = mongoose.model("Users", UserSchema);

module.exports = UserModal;