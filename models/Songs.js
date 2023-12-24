const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    short_description:{
        type:String,
        required:true,
        max:300
    },
    live_image:{
        type: String,
        default: null
    },
    local_image:{
        type: String,
        default: null
    },
    live_song:{
        type: String,
        default: null
    },
    local_song:{
        type: String,
        default: null
    },

    isUploaded: {
        type: Boolean,
        default: false
    },
    duration:{
        type: Number,
        default:0,
    },
    artist:[
        {
            type: Schema.Types.ObjectId,
            required:true
        }
    ],
    genre :[
        {
            type: Schema.Types.ObjectId,
            required:true
        }
    ],
    language:{
        type:String,
        required:true
    },
    visits:{
        type:Number,
        required:true,
        default:0
    },
    

    keywords:[
        {
            type:Schema.Types.String,
            // required:true
        }
    ]


},{timestamps:true})

const SongsModal = mongoose.model("Songs", SongsSchema);

module.exports = SongsModal;