const { cloudinary_js_config } = require('../common/serverUpload');
const serverUpload = require('../common/serverUpload');
const FileUploadInfoModal = require('../models/FileUploadInfo');
const fs = require('fs');
const path = require('path');



class FileManageClass {
    constructor(file={}) {
        console.log({file});
        this.file = file;
    }
    async fileUploadToDB() {
        console.log({file:this.uploadData});
        const fileUpload  = new FileUploadInfoModal()
        fileUpload.asset_id = this.uploadData.asset_id;
        fileUpload.public_id = this.uploadData.public_id;
        fileUpload.version = this.uploadData.version;
        fileUpload.version_id = this.uploadData.version_id;
        fileUpload.signature = this.uploadData.signature;
        fileUpload.width = this.uploadData.width;
        fileUpload.height = this.uploadData.height;
        fileUpload.format = this.uploadData.format;
        fileUpload.resource_type = this.uploadData.resource_type;
        fileUpload.created_at = this.uploadData.created_at;
        fileUpload.tags = this.uploadData.tags;
        fileUpload.bytes = this.uploadData.bytes;
        fileUpload.type = this.uploadData.type;
        fileUpload.etag = this.uploadData.etag;
        fileUpload.placeholder = this.uploadData.placeholder;
        fileUpload.url = this.uploadData.url;
        fileUpload.secure_url = this.uploadData.secure_url;
        fileUpload.folder = this.uploadData.folder;
        fileUpload.original_filename = this.uploadData.original_filename;
        fileUpload.api_key = this.uploadData.api_key;
        return await fileUpload.save();
        // return true;
    }
    async uploadToServer (folder) {
        const promise = new Promise(async(resolve, reject) => {
            try {
                // "musify"
                const result = await serverUpload.uploader.upload(this.file.path,{...cloudinary_js_config, folder:"musify/"+folder, resource_type:"auto"});
                this.uploadData = result;
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });    
        return promise;
    };
    deleteLocalFile () {
        // let file = __dirname+"\\"+this.file.path;
        const filepath = path.join(__dirname,"..",this.file.path);
        console.log(filepath);
        let promise = new Promise(function(resolve, reject) { 
            fs.unlink(filepath, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            } 
          
        // //     // Make an asynchronous call and either resolve or reject
            });
        });
        return  promise;
        // return true;
    }
    static async deleteServerFile (secure_url){
        console.log({secure_url});
        const fileInfo = await FileUploadInfoModal.findOne({secure_url})
        // console.log({fileInfo});
        if (!fileInfo) {
            return new Error("No Image Info Found as"+secure_url);
        }
        const res = await serverUpload.api.delete_resources(fileInfo.public_id);
        // console.log({res});
        if(!res){
            return new Error("fail to delete file from server"+secure_url);
        }
        const deleteFromDB = await FileUploadInfoModal.findByIdAndDelete(fileInfo._id)
        if(!deleteFromDB){
            return new Error("fail to delete file from db"+secure_url);
        }
        return true;
        
    }
}

module.exports = FileManageClass;