const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    title:{
        type:String,
        required:true
    },
   sale_price:{
       type:Number,
       required:true
   },
   regular_price:{
        type:Number,
        required:true
   },
   offer_message:{
        type:String,
   },
   active:{
    type:Boolean,
    required:true
   },
   specification:{
       type:Schema.Types.Mixed
   },

},{
    timestamps:true
})

const PackageModal = mongoose.model("Package", PackageSchema);

module.exports = PackageModal;