const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    live_image:{
        type: String,
        default: null
    },
    local_image:{
        type: String,
        default: null
    },

    isUploaded: {
        type: Boolean,
        default: false
    }

},{timestamps:true})

const GenreModal = mongoose.model("Genre", GenreSchema);

module.exports = GenreModal;