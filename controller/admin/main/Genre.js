const GenreModal = require("../../../models/Genre");
const validator = require("validator");
const serverUpload = require("../../../common/serverUpload");
const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const FileUploadInfoModal = require("../../../models/FileUploadInfo");
// const { FileUploadHandler, DeleteFile } = require("../../../common/common");
const FileManageClass = require("../../../packages/FileManageClass");

const GetGenreList = async(req, res, next)=>{
    const {name="", language=[], offset=0, limit=5} = req.query;
    const query = {};
    if(name.length>0){
        query.name=name;
    }
   
    try {
        let option={}
        if(name!=="")
        option = {'name': {'$regex': '.*'+query.name+'.*',$options:"i"}}

        const Genre = await GenreModal.find(option).skip(offset).limit(limit);
        return res.status(200).json({status:"success", message:"Genre List", data: Genre})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const AddGenreList = async(req, res, next)=>{
    const {name} = req.body;
    const file = req.file;
    console.log({name});
    console.log(req.file, req.files);
    const query = {};
    if(!name.length>0){
        return res.status(422).json({status:"failed", message:"Genre name is missing"})

    }
    
    
    try {  
        
        const newGenre = new GenreModal() 
        newGenre.name=name;
        newGenre.local_image = file.path
        
        const savedNewGenre = await newGenre.save()
        if(!savedNewGenre){
            
            return res.status(422).send({status: "failed", message:"Something went Wrong", data: savedNewGenre});
            
        }
        res.status(200).send({status:"success", message:"New Genre Added Successfully", data: savedNewGenre})
       
        const newFileManageClass = new FileManageClass(file);
        const fileUploaded = await newFileManageClass.uploadToServer("genres");
        // console.log({fileUploaded});

        if(!fileUploaded){ 
            console.log("failed to upload to cloud storage");
        }
        const uploadedToDB = await newFileManageClass.fileUploadToDB() 
        if(!uploadedToDB){ 
            console.log("failed to save database storage");
        }
        const confimUploadedToDB = await GenreModal.findByIdAndUpdate(newGenre._id,{$set:{
            live_image: fileUploaded.secure_url,
            isUploaded: true
        }})
        if(await confimUploadedToDB.save()){ 
            console.log("genere data updated successfully");
        }
        const deleted = await newFileManageClass.deleteLocalFile();
        console.log({deleted});
        
       

        
        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewGenre});
        
        // return res.status(200).json({status:"success", message:"New Genre Added Successfully", data: savedNewGenre||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const DeleteGenreList = async(req, res, next)=>{
    const {id} = req.params;
    // console.log(req.file);
    console.log({body :req.params});
    if(!id && !id?.length>0){
        return res.status(422).json({status:"failed", message:"Genre id Not Found"})

    }
    
    
    try {  
        
        const genre = await GenreModal.findById(id); 
        
        
        console.log(genre.live_image);
        if(!genre){
            
            return res.status(422).send({status: "failed", message:"Genre Not Found", data: genre});
            
        }
        // const fileInfo = FileUploadInfoModal.findOne({secure_url:genre.live_image})
        const serverfileDeleted = await FileManageClass.deleteServerFile(genre.live_image);
        if(!serverfileDeleted){
            
            res.status(422).send({status: "failed", message:"fail to delete server image", data: genre})
        }
        const deletedGenre = await GenreModal.findByIdAndDelete(id);
        // console.log({fileUploaded});

        if(!deletedGenre){ 
            console.log("failed to upload to cloud storage");
        }
        res.status(200).json({status:"success", message:"Genre has been Deleted Successfully", data:null})
     
        
       

        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewGenre});
        
        // return res.status(200).json({status:"success", message:"New Genre Added Successfully", data: savedNewGenre||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}

module.exports ={
    GetGenreList,
    AddGenreList,
    DeleteGenreList
}