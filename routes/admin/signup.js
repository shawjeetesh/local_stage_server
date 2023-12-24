const Route = require("express").Router();
const {trimData} = require('../../common/common');
const UserModal = require("../../models/Users");
// const admin = require("../../config/firebaseConfig")
// Route.post("/", async (req, res, next)=>{
//     const {email , password, name, phone} = req.body
//     console.log("body",req.body);

//     if(!trimData(name)){
//         return res.status(403).json({status:"failed", message:"Username is missing"})
//     }
//     // console.log(`"jeet@gmail.com".match()`,"jeet@gmail.com".match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
//     // if("jeet@gmail.com".match()){
//     //     return res.status(403).json({status:"failed", message:"Username is missing"}).end()
//     // }
//     if(!password){
//         return res.status(403).json({status:"failed", message:"Password is missing"})
//     }
//     if(!email){
//         return res.status(403).json({status:"failed", message:"Email is missing"})
//     }
//     if(!phone){
//         return res.status(403).json({status:"failed", message:"Phone is missing"})
//     }

//     const existEmail = await UserModal.findOne({email: email})
//     console.log("existEmail",existEmail)
//     if(existEmail){
//         return res.status(403).send({status: "failed", message:"Email Already Exits"});
//     }
//     const existPhone = await UserModal.findOne({phone_number: phone})
//     console.log("existPhone",existPhone)
//     if(existPhone){
//         return res.status(403).send({status: "failed", message:"Phone Number Already Exits"});
//     }
//     const newUser = new UserModal();
//     newUser.name = name;
//     newUser.password = newUser.hashPassword(password);
//     newUser.email = email.toLowerCase();
//     newUser.phone_number = phone;
//     try {
//         const userRecord = await admin.auth()
//         .createUser({
//             email: newUser.email,
//             emailVerified: false,
//             phoneNumber: ("+91"+phone),
//             password: password,
//             displayName: newUser.name,
//             disabled: false,
//         })
//         console.log('Successfully created new user:', userRecord.uid);
        
//     } catch (error) {
//         console.log('Error creating new user:', error);
//     }
//     const userSaved = await newUser.save()
//     console.log("userSaved",userSaved)
   
//     if(!userSaved)
//     return res.status(400).send({status: "failed", message:"Something went Wrong", data: userSaved});

//     return res.send({status: "success", message:"Successfully Created New User", data: {token: newUser.createToken(newUser._id,"1234567890"), name: newUser.name, FirebaseToken: user.createToken(userRecord.uid)}})
// })
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
//     try {
//        const verifyLinkSended = await admin.auth().generateEmailVerificationLink(["jesnal@mailinator.com"])
//        console.log('Successfully verifyLinkSended new user:', verifyLinkSended);
//        const mailsended = await admin.firestore().collection('mail').add({
//         to: 'jeeteshshaw@gmail.com',
//         message: {
//           subject: 'Hello from Firebase!',
//           html: 'This is an <code>HTML</code> email body.',
//         },
//       })

//       console.log("mailsended",mailsended)
        
//     } catch (error) {
//         console.log('Error verifyLinkSended new user:', error);
        
//     }

//     return res.status(200).send("Page not found")
// })

module.exports = Route