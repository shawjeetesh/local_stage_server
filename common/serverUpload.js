// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     secure: true,
//     cloud_name: 'jesnal', 
//     api_key: '571473472934223', 
//     api_secret: 'vOCwYwus6gNuJcVjz0LyUYXzEgg',

//   });
  
//   // Log the configuration
// console.log(cloudinary.config());
// const uploadFile = async(file)=>{
//     const options = {
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//          folder:"test"
//       };
  
//       try {
//         // Upload the image
//         const result = await cloudinary.uploader.upload("../ab.jpg", {...options, folder:"test"});
//         console.log(result);
//         return result.public_id;
//       } catch (error) {
//         console.error(error);
//       }
    
//     // console.log({res});
// }

// uploadFile()


var cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,

});
module.exports = cloudinary;

// module.exports = uploadFile