const AlbumModal = require("../../../models/Album");
const validator = require("validator");
const serverUpload = require("../../../common/serverUpload");
const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const FileUploadInfoModal = require("../../../models/FileUploadInfo");
// const { FileUploadHandler, DeleteFile } = require("../../../common/common");
const FileManageClass = require("../../../packages/FileManageClass");
const { AlbumCreatedByUser, AlbumCreatedBySongs } = require("../../../packages/aggregations");
const mongoose = require("mongoose");

const GetAlbumList = async(req, res, next)=>{
    const {name="", language=[]} = req.query;
    const query = {};
    if(name.length>0){
        query.name=name;
    }
   
    try {
        
        let aggry = AlbumCreatedByUser;
        if(name!=="")
        aggry.push({$match:{name:{'$regex': '.*'+name+'.*',$options:"i"}}})

        const Album = await AlbumModal.aggregate(aggry).exec(); 
        return res.status(200).json({status:"success", message:"Album List", data: Album})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const GetAlbumSongs = async(req, res, next)=>{
    const id = req.params.id
    const query = {};
    if(!id){
        return res.status(422).json({status:"failed", message:"Album name is missing"})

    }
   console.log({id});
    try {
        let aggry = AlbumCreatedBySongs;
        
        const Album = await  AlbumModal.aggregate([...aggry,{
            $match:{_id:mongoose.Types.ObjectId(id)}
        }]).exec();
        if(!Album){
            return res.status(422).json({status:"success", message:"No Album Found"})

        }
        return res.status(200).json({status:"success", message:"Album List", data: Album[0]})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const AddAlbumList = async(req, res, next)=>{
    const {name, } = req.body;
    const file = req.file;
    console.log({name});
    // console.log(req.file, req.files);
    // const query = {};
    if(!name){
        return res.status(422).json({status:"failed", message:"Album name is missing"})

    }
    
    
    try {  
        
        const newAlbum = new AlbumModal() 
        newAlbum.name=name;
        newAlbum.local_image = file.path;
        newAlbum.created_by = req.headers._id;
        
        const savedNewAlbum = await newAlbum.save()
        if(!savedNewAlbum){
            
            return res.status(422).send({status: "failed", message:"Something went Wrong", data: savedNewAlbum});
            
        }
        res.status(200).send({status:"success", message:"New Album Added Successfully", data: savedNewAlbum})
       
        const newFileManageClass = new FileManageClass(file);
        const fileUploaded = await newFileManageClass.uploadToServer("albums");
        // console.log({fileUploaded});

        if(!fileUploaded){ 
            console.log("failed to upload to cloud storage");
        }
        const uploadedToDB = await newFileManageClass.fileUploadToDB() 
        if(!uploadedToDB){ 
            console.log("failed to save database storage");
        }
        const confimUploadedToDB = await AlbumModal.findByIdAndUpdate(newAlbum._id,{$set:{
            live_image: fileUploaded.secure_url,
            isUploaded: true
        }})
        if(await confimUploadedToDB.save()){ 
            console.log("genere data updated successfully");
        }
        const deleted = await newFileManageClass.deleteLocalFile();
        console.log({deleted});
        
       

        
        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewAlbum});
        
        // return res.status(200).json({status:"success", message:"New Album Added Successfully", data: savedNewAlbum||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const AddSongInAlbum = async (req, res) => {
    const album_id = req.params.id
    const song_id = req.body.song_id
    console.log({album_id})
    try {
        const updated = await AlbumModal.findByIdAndUpdate(album_id, {$addToSet:{songs:song_id}})
        if(!updated){
            return res.status(422).send({status: "failed", message:"Something went Wrong"});

        }
        res.status(200).send({status:"success", message:"New Song added to Album", data: updated})

    } catch (error) {
        console.log({error});
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
        
    }
}
const DeleteSongInAlbum = async (req, res) => {
    const album_id = req.params.id
    const song_id = req.params.song_id
    console.log({album_id})
    try {
        const updated = await AlbumModal.findByIdAndUpdate(album_id, {$pull:{songs:song_id}})
        if(!updated){
            return res.status(422).send({status: "failed", message:"Something went Wrong"});

        }
        res.status(200).send({status:"success", message:"New Song added to Album", data: updated})

    } catch (error) {
        console.log({error});
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
        
    }
}


const DeleteAlbumList = async(req, res, next)=>{
    const {id} = req.params;
    // console.log(req.file);
    console.log({body :req.params});
    if(!id && !id?.length>0){
        return res.status(422).json({status:"failed", message:"Album id Not Found"})

    }
    
    
    try {  
        
        const genre = await AlbumModal.findById(id); 
        
        
        console.log(genre.live_image);
        if(!genre){
            
            return res.status(422).send({status: "failed", message:"Album Not Found", data: genre});
            
        }
        // const fileInfo = FileUploadInfoModal.findOne({secure_url:genre.live_image})
        const serverfileDeleted = await FileManageClass.deleteServerFile(genre.live_image);
        if(!serverfileDeleted){
            
            res.status(422).send({status: "failed", message:"fail to delete server image", data: genre})
        }
        const deletedAlbum = await AlbumModal.findByIdAndDelete(id);
        // console.log({fileUploaded});

        if(!deletedAlbum){ 
            console.log("failed to upload to cloud storage");
        }
        res.status(200).json({status:"success", message:"Album has been Deleted Successfully", data:null})
     
        
       

        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewAlbum});
        
        // return res.status(200).json({status:"success", message:"New Album Added Successfully", data: savedNewAlbum||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}
const GetRandomAlbums = async (req, res)=>{
    try {
        const popularSong = await AlbumModal.aggregate([{$sample:{size:5}}]).limit(5).exec();
        return res.status(200).json({status:"success", message:"Songs Listened Successfully", data: popularSong});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: null});

    }
}

module.exports ={
    GetAlbumList,
    AddAlbumList,
    DeleteAlbumList,
    AddSongInAlbum,
    DeleteSongInAlbum,
    GetAlbumSongs,
    GetRandomAlbums
}