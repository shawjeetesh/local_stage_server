const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitsSchema = new Schema({
    data_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    user_id:{
        type: String,
        default: null
    },
    type:{
        type: String,
        
        enum : ['song','album', "artist","genre"],
        default: "song",
    },
    gener_id:[
        {
            type: Schema.Types.ObjectId,
            // required:true
        }
    ],
    artist_id:[
        {
            type: Schema.Types.ObjectId,
            // required:true
        }
    ],


},{timestamps:true})

const VisitsModal = mongoose.model("Visits", VisitsSchema);

module.exports = VisitsModal;