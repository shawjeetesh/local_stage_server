const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    
    gender:{
        type:String,
        required:true
    },
    language:[{
        type: String,
        
    }],
    dev_image:{
        type: String,
        default:""

    },
    live_image:{
        type: String,
        default:""
    },
    isUploaded: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

const ArtistModal = mongoose.model("Artist", ArtistSchema);

module.exports = ArtistModal;