const ContactFormModal = require("../../models/Contact")
const validator = require("validator")
const Router = require("express").Router()


Router.post("/form", async(req, res, next)=>{
    const {name, email, message} = req.body
    if(!name)
    return res.status(403).send({status:"failed", message:"Name missing", data:null })
    if(!email)
    return res.status(403).send({status:"failed", message:"Email missing", data:null })
    if(!validator.default.isEmail(email)){
        return res.status(403).send({status:"failed", message:"Please Enter a vaild mail", data:null })
    }
    if(!message)
    return res.status(403).send({status:"failed", message:"Message missing", data:null })
    const newForm = new ContactFormModal()
    newForm.name=name;
    newForm.email = email;
    newForm.message = message;
    const saveForm = await newForm.save()
    if(!saveForm)
    return res.status(400).send({status: "failed", message:"Something went Wrong", data: userSaved});

    return res.send({status: "success", message:"Successfully Form Submitted We will Contact soon", data:{referalNo:newForm._id}, name: name})

})

module.exports = Router