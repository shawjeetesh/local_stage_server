const ContactFormModal = require("../../models/Contact");
const UserModal = require("../../models/Users");
const firebasAuth = require("../../config/firebaseAuth");

const GetProfileInfoController = async(req, res, next) => {
    console.log("dsdas",req.headers._id)
    try {
        const user = await UserModal.findById(req.headers._id).select({password:0});
        if(!user)
        return res.status(404).send({status:"failed", message:"No User found", data: user})

        delete user.password;
        return res.status(200).send({status:"success", data: user})
    } catch (error) {
        console.log({error})
        return res.status(500).send({status:"success", message:"Something went wrong", data: error})
        
    }
};

const ProfileUpdateController = async(req, res, next) => {
    const {device_token} = req.body;

    try {
        const getUser = await firebasAuth.auth().getUser(req.headers._id)
        
        const user = await UserModal.findOne({firebase_id: req.headers._id});
        if(!user){
            const localNewUser = new UserModal()
            localNewUser.name = getUser.displayName;
            localNewUser.phone_number = getUser.phoneNumber;
            localNewUser.profile_image = getUser.photoURL;
            localNewUser.email = getUser.email;
            localNewUser.firebase_id = getUser.uid
            if(device_token)
            localNewUser.device_token = device_token||"";

            if(await localNewUser.save())
            return res.status(200).send({status:"success", message:"Successfully Updated", data: user})
        }

        user.name = getUser.displayName;
        user.profile_image = getUser.photoURL;
        user.email = getUser.email;
        if(device_token)
        user.device_token = device_token||"";

        if(await user.save()){
            return res.status(200).send({status:"success", message:"Successfully Updated", data: user})

        }

    } catch (error) {
        console.log({error:error.toString()})
        return res.status(500).send({status:"success", message:"Something went wrong", data: error})
        
    }
};
const ContactFormController = async(req, res, next) => {
    const {
        name= "",
        email= "",
        message= "",
        extra= "",
    } = req.body;
    console.log(req.body);
    try {
        // const user = await UserModal.findById(req.headers._id);
        if(name.length == 0) {
            return res.status(400).send({status:"failed", message:"Name Missing"})

        }
        if(email.length == 0) {
            return res.status(400).send({status:"failed", message:"Email Missing"})

        }
        if(message.length == 0) {
            return res.status(400).send({status:"failed", message:"Message Missing"})

        }
        // if(extra.length > 0) {
        //     user.name = name;
        // }
        const newContactForm = new ContactFormModal();
        newContactForm.name = name;
        newContactForm.email = email;
        newContactForm.message = message;
        newContactForm.extra = extra
        if(await newContactForm.save()){
            return res.status(200).send({status:"success", message:"Contact Form Successfully Submited", data: newContactForm})

        }

    } catch (error) {
        console.log({error:error.toString()})
        return res.status(500).send({status:"success", message:"Something went wrong", data: error})
        
    }
};

module.exports={
GetProfileInfoController,
ProfileUpdateController,
ContactFormController
}