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
        default: ""
    },
    local_image:{
        type: String,
        default: ""
    },
    location_text:{
        type: String,
        default: ""
    },
    location_cord:{
        type: String,
        default: ""

    },

    isUploaded: {
        type: Boolean,
        default: false
    },
   
    categories :[
        {
            type: Schema.Types.ObjectId,
            required:true
        }
    ],
    sub_category:[
        {
            type: Schema.Types.ObjectId,
            required:true
        }
    ],
    sale_price:{
        type:Number,
        required:true
    },
    regular_price:{
         type:Number,
         required:true
    },
    city:{

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