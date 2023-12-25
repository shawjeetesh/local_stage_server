const Route = require("express").Router();
const {trimData} = require('../../common/common');
const UserModal = require("../../models/Users");
// const admin = require("../../config/firebaseConfig");
const { SignupController } = require("../../controller/auth");
Route.post("/", SignupController)
// Route.get("/", async(req, res, next)=>{
//     // const {email, phone, password} = req.body
//     console.log(req);
//     try {
//         const userRecord = await admin.auth()
//         .createUser({
//             email: 'jeeteshshaw@gmail.com',
//             emailVerified: true,
//             phoneNumber: '+11234567890',
//             password: '123456',
//             displayName: 'John Doe',
//             photoURL: 'http://www.example.com/12345678/photo.png',
//             disabled: false,
//         })
//         console.log('Successfully created new user:', userRecord.uid);
        
//     } catch (error) {
//         console.log('Error creating new user:', error);
//     }
   

//     return res.status(200).send("Page not found")
// })

module.exports = Route