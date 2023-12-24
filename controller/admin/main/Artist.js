const ArtistModal = require("../../../models/Artist")
const validator = require("validator");
const FileManageClass = require("../../../packages/FileManageClass");



const GetArtistsList = async(req, res, next)=>{
    const {name="", language=[], offset=0, limit=1000} = req.query
    const query = {};
    if(name.length>0){
        query.name=name;
    }
    if(language.length>0){
        query.language=language;
    }
    console.log({query}, req.query);;
    try {
        let artists;
        if(query.language || query.name)
        artists = await ArtistModal.find({'name': {'$regex': '.*'+query.name+'.*',$options:"i"}}).skip(offset).limit(limit);
        else
        artists = await ArtistModal.find({}).skip(offset).limit(limit); 
        return res.status(200).json({status:"success", message:"Artists List", data: artists})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}



const GetArtistsListWithFiter = async(req, res, next)=>{
    const {name="", language=[]} = req.params;
    const query = {};
    if(name.length>0){
        query.name=name;
    }
    if(language.length>0){
        query.language=language;
    }
    try {
        // if(query.language)
        // const artists = await ArtistModal.find({'name': {'$regex': '.*'+query.name+'.*',$options:"i"}}) 
        const artists = await ArtistModal.find({'name': {'$regex': '.*'+query.name+'.*',$options:"i"}}) 
        return res.status(200).json({status:"success", message:"Artists List", data: artists})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}



const AddArtistsList = async(req, res, next)=>{
    const {name, language=[],gender} = req.body
    const file = req.file;
    console.log(req.body);
    if(!name.length>0){
        return res.status(422).json({status:"failed", message:"Artist name is missing"})

    }
    if(!language.length>0){
        return res.status(422).json({status:"failed", message:"Artist language is missing"})

    }
    if(!gender.length>0){
        return res.status(422).json({status:"failed", message:"Artist language is missing"})

    }
    console.log(name, language);
    try {
        const newArtist = new ArtistModal() 
        newArtist.name=name;
        newArtist.language=language;
        newArtist.gender=gender;
        newArtist.dev_image = file.path;
        const savedNewArtist = await newArtist.save()
        if(!savedNewArtist)
        return res.status(422).send({status: "failed", message:"Something went Wrong", data: savedNewArtist});
        // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewArtist});
        res.status(200).json({status:"success", message:"New Artist Added Successfully", data: savedNewArtist})
        
        const newFileManageClass = new FileManageClass(file);
        const fileUploaded = await newFileManageClass.uploadToServer("artists");
        // console.log({fileUploaded});

        if(!fileUploaded){ 
            console.log("failed to upload to cloud storage");
        }
        const uploadedToDB = await newFileManageClass.fileUploadToDB() 
        if(!uploadedToDB){ 
            console.log("failed to save database storage");
        }
        const confimUploadedToDB = await ArtistModal.findByIdAndUpdate(newArtist._id,{$set:{
            live_image: fileUploaded.secure_url,
            isUploaded: true
        }})
        if(await confimUploadedToDB.save()){ 
            console.log("genere data updated successfully");
        }
        const deleted = await newFileManageClass.deleteLocalFile();
        console.log({deleted});
        
        return res.end(); 
        
    } catch (error) {
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}



const DeleteArtistsList = async(req, res, next)=>{
    const {id} = req.params;
    // console.log(req.file);
    if(!id){
        return res.status(422).json({status:"failed", message:"Genre id Not Found"})

    }
    
    
    console.log({id});
    try {  
        
        const artist = await ArtistModal.findById(id); 
        
        
        console.log(artist.live_image);
        if(!artist){
            
            return res.status(422).send({status: "failed", message:"Genre Not Found", data: artist});
            
        }
        // const fileInfo = FileUploadInfoModal.findOne({secure_url:artist.live_image})
        const serverfileDeleted = await FileManageClass.deleteServerFile(artist.live_image);
        if(!serverfileDeleted){
            
            res.status(422).send({status: "failed", message:"fail to delete server image", data: artist})
        }
        const deletedArtist = await ArtistModal.findByIdAndDelete(id);
        // console.log({fileUploaded});

        if(!deletedArtist){ 
            console.log("failed to upload to cloud storage");
        }
        res.status(200).json({status:"success", message:"Artist has been Deleted Successfully", data:null})
     
        
       

        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewGenre});
        
        // return res.status(200).json({status:"success", message:"New Genre Added Successfully", data: savedNewGenre||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


module.exports ={
    GetArtistsList,
    AddArtistsList,
    DeleteArtistsList,
    GetArtistsListWithFiter
}