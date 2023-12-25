const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    songs:[
        {
            type:Schema.Types.ObjectId
        }
    ],
    type: {
        type: String,
        enum : ['public','private'],
        default: "public",
    },
    created_by :{
        type:Schema.Types.ObjectId,
        required: true,
    },
    live_image:{
        type: String,
        default: null
    },
    local_image:{
        type: String,
        default: null
    },



}, {timestamps:true})

const AlbumModal = mongoose.model("Album", AlbumSchema);

module.exports = AlbumModal;