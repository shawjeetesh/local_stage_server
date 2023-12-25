// const ContactFormModal = require("../../models/Contact");

// const GetContactData = async(req, res, next)=>{
//     const allFormData = ContactFormModal.find({});
//     return res.send({status:"success", message:"Sucessfully retrive contact data", data: allFormData})
// }


const CreateBlankPortFolio = async(req, res, next)=>{
    const newPortfolio = new PortfolioModal();
    let newPortfolio_id;
    // if(req.headers._id === "61ca156cbf14c30275163d34")
    newPortfolio.user_id = req.headers._id;
    newPortfolio.save()
    .then(result=>{
        newPortfolio_id = result._id
        return res.status(200).send({status:"success", mesasge:"Successfully Created", data: result})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(400).send({status:"failed", mesasge:"Failed Created", data: error});
    })
    console.log("response sended")
    return UserModal.findByIdAndUpdate(req.headers._id, {$push:{"portfolio_short_details":{portfolio_id:newPortfolio_id, title:"Profile"}}})
    
}

const GetPortfolioDataById = async(req, res, next)=>{
    // const {email, phone, password} = req.body
    console.log(req.params.id);
    try {
        const portfolioData = await PortfolioModal.findById(req.params.id)
        console.log("portfolioData", portfolioData)
        // console.log("portfolioData", portfolioData)
        if(portfolioData)
        return res.status(200).send({status:"success", message:"Successfully Data Found", data: portfolioData})
    } catch (error) {
        console.log(error)
        return res.status(404).send({status:"failed", message:"Data Not Found", data: null})
    }
    // const portfolioData = await PortfolioModal.findById(req.params.id)
}
module.exports = {
    CreateBlankPortFolio,
    GetPortfolioDataById,
    // GetContactData
}