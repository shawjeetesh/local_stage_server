const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    extra:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const ContactFormModal = mongoose.model("ContactForm", ContactFormSchema);
module.exports = ContactFormModal;
