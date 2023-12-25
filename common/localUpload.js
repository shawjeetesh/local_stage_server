const multer = require('multer');

exports.storage = (dist) => multer.diskStorage({
    destination: (req, file, cd)=>{
        cd(null, dist)
    },
    filename: (req, file, cd)=>{
        // console.log(req.body)
        if(file.mimetype.includes("audio"))
        cd(null, "audio"+"-"+Date.now()+"."+file.originalname.split('.')[1])
        else
        cd(null, "img"+"-"+Date.now()+"."+file.mimetype.split('/')[1])
    }
});


// exports.audioStorage = (dist) => multer.diskStorage({
//     destination: (req, file, cd)=>{
//         cd(null, dist)
//     },
//     filename: (req, file, cd)=>{
//         // console.log(file.originalname.split('.'))
//         cd(null, "audio"+"-"+Date.now()+"."+file.originalname.split('.')[1])
//     }
// });

