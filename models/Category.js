const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    live_image:{
        type: String,
        default: ""
    },
    local_image:{
        type: String,
        default: ""
    },

    isUploaded: {
        type: Boolean,
        default: false
    }

},{timestamps:true})

const CategoryModal = mongoose.model("category_list", CategorySchema);

module.exports = CategoryModal;