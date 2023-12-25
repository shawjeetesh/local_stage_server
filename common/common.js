const FileUploadInfoModal = require("../models/FileUploadInfo");
const { patch } = require("../routes/admin/main/genres");
const fs = require("fs");

const trimData = (string)=>{
    return string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'').trim();
}

const FileUploadHandler = async (file) => {
    console.log({file});
    // const fileUpload  = new FileUploadInfoModal()
    // fileUpload ={
    //     ...fileUpload,
    //     ...file
    // } 
    // return await fileUpload.save();
    return true;
}



module.exports = {
    trimData,
    FileUploadHandler,
    
}