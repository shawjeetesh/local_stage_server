const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// {
//     asset_id: '2fd78c94ce4bab6ec91fcd6cd808dfdd',
//     public_id: 'musify/genres/j6qgpay83snrvasuwiqa',
//     version: 1678006044,
//     version_id: 'b5e6fa9c7a80d2ea8357c2e30f1a7f87',
//     signature: '0704c2c36fa69970a48fe20f73d9a473f9163c0a',
//     width: 1000,
//     height: 237,
//     format: 'png',
//     resource_type: 'image',
//     created_at: '2023-03-05T08:47:24Z',
//     tags: [],
//     bytes: 197770,
//     type: 'upload',
//     etag: '57b040212a377ea1f6bb230288e0ba6e',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/jesnal/image/upload/v1678006044/musify/genres/j6qgpay83snrvasuwiqa.png',
//     secure_url: 'https://res.cloudinary.com/jesnal/image/upload/v1678006044/musify/genres/j6qgpay83snrvasuwiqa.png',
//     folder: 'musify/genres',
//     original_filename: 'img-1678006040736',
//     api_key: '571473472934223'
//   }
const FileUploadInfoSchema = new Schema({
    asset_id:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    },
    version:{
        type:String,
        required:true
    },
    version_id:{
        type:String,
        default:""
    },
    signature:{
        type:String,
        default:""
    },
    width:{
        type:Number,
        default:""
    },
    height:{
        type:Number,
        default:""
    },
    format:{
        type:String,
        default:""
    },
    resource_type:{
        type:String,
        default:""
    },
    created_at:{
        type:Date,
        default:null
    },
    tags:{
        type:Array,
        default:""
    },
    bytes:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:""
    },
    etag:{
        type:String,
        default:""
    },
    placeholder:{
        type:String,
        default:""
    },
    url:{
        type:String,
        default:""
    },
    secure_url:{
        type:String,
        default:""
    },
    folder:{
        type:String,
        default:""
    },
    original_filename:{
        type:String,
        default:""
    },
    api_key:{
        type:String,
        default:""
    }
    
},{
    timestamps:true
    
})

const FileUploadInfoModal = mongoose.model("FileUploadInfo", FileUploadInfoSchema);
module.exports = FileUploadInfoModal;
// asset_id: '46c81a51f297f7f4de96ee459024fd40',
//     public_id: 'musify/opnplfqnb5bcxbv90qdd',
//     version: 1677958449,
//     version_id: 'b557887b9757035bc6d6da45be6915ab',
//     signature: '2eab011fed190caf2e040e70ddf328fafe4ed113',
//     width: 1000,
//     height: 237,
//     format: 'png',
//     resource_type: 'image',
//     created_at: '2023-03-04T19:34:09Z',
//     tags: [],
//     bytes: 197770,
//     type: 'upload',
//     etag: '57b040212a377ea1f6bb230288e0ba6e',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/jesnal/image/upload/v1677958449/musify/opnplfqnb5bcxbv90qdd.png',
//     secure_url: 'https://res.cloudinary.com/jesnal/image/upload/v1677958449/musify/opnplfqnb5bcxbv90qdd.png',
//     folder: 'musify',
//     original_filename: 'img-1677958445984',
//     api_key: '571473472934223'
//   }