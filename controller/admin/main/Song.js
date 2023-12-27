// const validator = require("validator");
// const serverUpload = require("../../../common/serverUpload");
// const cloudinaryConfig = require("../../../config/cloudinaryConfig");
// const FileUploadInfoModal = require("../../../models/FileUploadInfo");
// const { FileUploadHandler, DeleteFile } = require("../../../common/common");
const FileManageClass = require("../../../packages/FileManageClass");
const SongsModal = require("../../../models/Product");
const { SongAggregation } = require("../../../packages/aggregations");
const VisitsModal = require("../../../models/Visits");
const mongoose = require("mongoose");
const AlbumModal = require("../../../models/SubCategories");
const ViewedSong = async (req, res) =>{
    const song_Id = req.params.song_id;
    try {
        if(!song_Id){
            return res.status(422).send({status: "failed", message:"Song Id Missing"});
        }
        const updated = await SongsModal.findByIdAndUpdate(song_Id,{$inc:{visits:1}});
        if(!updated){
            return res.status(422).send({status: "failed", message:"Something went wrong"});
        }
        res.status(200).send({status: "success", message:"Song successfully Viewed"});
        const newVisit = new VisitsModal()
        newVisit.data_id= song_Id;
        newVisit.gener_id = updated.genre;
        newVisit.artist_id  = updated.artist;
        newVisit.type = "song";
        newVisit.user_id = req.headers._id;
        if(await newVisit.save())
        console.log("Visiter info updated");
        else
        console.log("Fail to add visitor info");
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const GetSongListWithFiter = async(req, res, next)=>{
    const {title="", language=[], category="", artist="",offset=0, limit=1000} = req.query;
    const query = {};
    // if(title.length>0){
    //     query.name=title;
    // }
    // // if(category.length>0){
    // //     query.category=name;
    // // }
    // if(language.length>0){
    //     query.language=language;
    // }
    try {
        let aggry = SongAggregation(category);
        let a = {
            $match:{}
        } 
        if(title!=="")
        query.title={'$regex': '.*'+title+'.*',$options:"i"}
        if(category!=""){
        query.genre = {$in: [mongoose.Types.ObjectId(category)]}};
        if(artist!=""){
        query.artist = {$in: [mongoose.Types.ObjectId(artist)]}};

        a.$match = query;
        console.log({name:req.query},[...aggry,a]);
        // const artists = await ArtistModal.find({'name': {'$regex': '.*'+query.name+'.*',$options:"i"}}) 
        // const songs = await SongsModal.find({'name': {'$regex': '.*'+query.name+'.*',$options:"i"}}) 
        const songs = await SongsModal.aggregate([...aggry,a]).skip(+offset).limit(+limit).exec()
        
        return res.status(200).json({status:"success", message:"Songs List", data: songs})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const AddSongList = async(req, res, next)=>{
    const {
        title,
        description,
        short_description,
        album,
        artist,
        genre,
        language,
        duration,
        keywords
    } = req.body;
    // const file = req.file;
    console.log(req.body);
    // console.log(req.files);
    let imagefile= req.files.imagefile[0], audiofile=req.files.audiofile[0];
   
    const query = {};
    // if(!name.length>0){
    //     return res.status(422).json({status:"failed", message:"Song name is missing"})

    // }
    
    
    try {  
    // console.log(imagefile);
        
        const newSong = new SongsModal() 
        newSong.title=title;
        newSong.description=description;
        newSong.short_description=short_description;
        newSong.album=album;
        // artist.map((item)=> newSong.artist.push(item));
        // genre.map((item)=> newSong.artist.push(item));
        newSong.duration = +duration;
        newSong.artist=artist;
        newSong.genre=genre;
        newSong.language=language;
        newSong.keywords=keywords;
        newSong.local_image = imagefile.path;
        newSong.local_song = audiofile.path;

        const savedNewSong = await newSong.save()
        if(!savedNewSong){
            
            return res.status(422).send({status: "failed", message:"Something went Wrong", data: savedNewSong});
            
        }
        res.status(200).send({status:"success", message:"New Song Added Successfully", data: savedNewSong})
       
        const newFileManageClass1 = new FileManageClass(imagefile);
        const newFileManageClass2 = new FileManageClass(audiofile);
        const fileUploaded1 = await newFileManageClass1.uploadToServer("songs");
        const fileUploaded2 = await newFileManageClass2.uploadToServer("songs");
        console.log({fileUploaded1, fileUploaded2});

        if(!fileUploaded1 || !fileUploaded2){ 
            console.log("failed to upload to cloud storage");
            return res.end();
        }
        const uploadedToDB1 = await newFileManageClass1.fileUploadToDB() 
        const uploadedToDB2 = await newFileManageClass2.fileUploadToDB() 
        if(!uploadedToDB1 || !uploadedToDB2){ 
            console.log("failed to save database storage");
            return res.end(); 
        }
        const confimUploadedToDB1 = await SongsModal.findByIdAndUpdate(newSong._id,{$set:{
            live_image: fileUploaded1.secure_url,
            isUploaded: true
        }})
        const confimUploadedToDB2 = await SongsModal.findByIdAndUpdate(newSong._id,{$set:{
            live_song: fileUploaded2.secure_url,
            isUploaded: true
        }})
        if(await confimUploadedToDB1.save() && await confimUploadedToDB2.save()){ 
            console.log("genere data updated successfully");
        }
        const deleted = await newFileManageClass1.deleteLocalFile();
        const deleted2 = await newFileManageClass2.deleteLocalFile();
        console.log({deleted, deleted2});
        
       

        
        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewSong});
        
        // return res.status(200).json({status:"success", message:"New Song Added Successfully", data: savedNewSong||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const DeleteSongList = async(req, res, next)=>{
    const {id} = req.params;
    // console.log(req.file);
    console.log({body :req.params});
    if(!id && !id?.length>0){
        return res.status(422).json({status:"failed", message:"Song id Not Found"})

    }
    
    
    try {  
        
        const song = await SongsModal.findById(id); 
        
        
        console.log(song.live_image);
        if(!song){
            
            return res.status(422).send({status: "failed", message:"Song Not Found", data: song});
            
        }
        // const fileInfo = FileUploadInfoModal.findOne({secure_url:song.live_image})
        const serverfileDeleted = await FileManageClass.deleteServerFile(song.live_image);
        const serverSongDeleted = await FileManageClass.deleteServerFile(song.live_song);
        if(!serverfileDeleted || !serverSongDeleted){
            
            res.status(422).send({status: "failed", message:"fail to delete server image", data: song})
        }
        const deletedSong = await SongsModal.findByIdAndDelete(id);
        // console.log({fileUploaded});

        if(!deletedSong){ 
            console.log("failed to upload to cloud storage");
        }
        res.status(200).json({status:"success", message:"Song has been Deleted Successfully", data:null})
     
        
       

        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewSong});
        
        // return res.status(200).json({status:"success", message:"New Song Added Successfully", data: savedNewSong||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const getPopularSongs = async (req, res)=>{
    try {
        const popularSong = await SongsModal.aggregate(SongAggregation()).sort({"visits":-1}).limit(10).exec();
        return res.status(200).json({status:"success", message:"Songs Listened Successfully", data: popularSong});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: null});

    }
}


module.exports ={
    GetSongListWithFiter,
    AddSongList,
    DeleteSongList,
    ViewedSong,
    getPopularSongs
}