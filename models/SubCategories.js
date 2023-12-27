const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    live_image:{
        type: String,
        default: ""
    },
    local_image:{
        type: String,
        default: ""
    },

    parent_category:{
        type: mongoose.Types.ObjectId,
        required:true
    },

    isUploaded: {
        type: Boolean,
        default: false
    }


}, {timestamps:true})

const AlbumModal = mongoose.model("Album", AlbumSchema);

module.exports = AlbumModal;