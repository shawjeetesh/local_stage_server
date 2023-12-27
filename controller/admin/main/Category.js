const CategoryModal = require("../../../models/Category");
const validator = require("validator");
const serverUpload = require("../../../common/serverUpload");
const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const FileUploadInfoModal = require("../../../models/FileUploadInfo");
// const { FileUploadHandler, DeleteFile } = require("../../../common/common");
const FileManageClass = require("../../../packages/FileManageClass");

const GetCategoryList = async(req, res, next)=>{
    const {name="", language=[], offset=0, limit=5} = req.query;
    const query = {};
    if(name.length>0){
        query.name=name;
    }
   
    try {
        let option={}
        if(name!=="")
        option = {'name': {'$regex': '.*'+query.name+'.*',$options:"i"}}

        const Category = await CategoryModal.find(option).skip(offset).limit(limit);
        return res.status(200).json({status:"success", message:"Category List", data: Category})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const AddCategoryList = async(req, res, next)=>{
    const {name} = req.body;
    const file = req.file;
    console.log({name});
    console.log(req.file, req.files);
    const query = {};
    if(!name.length>0){
        return res.status(422).json({status:"failed", message:"Category name is missing"})

    }
    
    if((await CategoryModal.find({name})).length)
    return res.status(422).json({status:"failed", message:"Category Name Already Exists"})
    
    try {  
        
        const newCategory = new CategoryModal() 
        newCategory.name=name;
        newCategory.local_image = file.path
        
        const savedNewCategory = await newCategory.save()
        if(!savedNewCategory){
            
            return res.status(422).send({status: "failed", message:"Something went Wrong", data: savedNewCategory});
            
        }
        res.status(200).send({status:"success", message:"New Category Added Successfully", data: savedNewCategory})
       
        const newFileManageClass = new FileManageClass(file);
        const fileUploaded = await newFileManageClass.uploadToServer("Categorys");
        // console.log({fileUploaded});

        if(!fileUploaded){ 
            console.log("failed to upload to cloud storage");
        }
        const uploadedToDB = await newFileManageClass.fileUploadToDB() 
        if(!uploadedToDB){ 
            console.log("failed to save database storage");
        }
        const confimUploadedToDB = await CategoryModal.findByIdAndUpdate(newCategory._id,{$set:{
            live_image: fileUploaded.secure_url,
            isUploaded: true
        }})
        if(await confimUploadedToDB.save()){ 
            console.log("genere data updated successfully");
        }
        const deleted = await newFileManageClass.deleteLocalFile();
        console.log({deleted});
        
       

        
        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewCategory});
        
        // return res.status(200).json({status:"success", message:"New Category Added Successfully", data: savedNewCategory||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}


const DeleteCategoryList = async(req, res, next)=>{
    const {id} = req.params;
    // console.log(req.file);
    console.log({body :req.params});
    if(!id && !id?.length>0){
        return res.status(422).json({status:"failed", message:"Category id Not Found"})

    }
    
    
    try {  
        
        const Category = await CategoryModal.findById(id); 
        
        
        console.log(Category.live_image);
        if(!Category){
            
            return res.status(422).send({status: "failed", message:"Category Not Found", data: Category});
            
        }
        // const fileInfo = FileUploadInfoModal.findOne({secure_url:Category.live_image})
        const serverfileDeleted = await FileManageClass.deleteServerFile(Category.live_image);
        if(!serverfileDeleted){
            
            res.status(422).send({status: "failed", message:"fail to delete server image", data: Category})
        }
        const deletedCategory = await CategoryModal.findByIdAndDelete(id);
        // console.log({fileUploaded});

        if(!deletedCategory){ 
            console.log("failed to upload to cloud storage");
        }
        res.status(200).json({status:"success", message:"Category has been Deleted Successfully", data:null})
     
        
       

        return res.end(); 
        // // return res.status().send({status: "failed", message:"Something went Wrong", data: savedNewCategory});
        
        // return res.status(200).json({status:"success", message:"New Category Added Successfully", data: savedNewCategory||[]})
    } catch (error) {
        console.log(error);

        return res.status(500).json({status:"failed", message:"Something Went Wrong", data: error})
    }
}

module.exports ={
    GetCategoryList,
    AddCategoryList,
    DeleteCategoryList
}