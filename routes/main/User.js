const Router = require('express').Router()
const { GetProfileInfoController, ProfileUpdateController, ContactFormController } = require("../../controller/main/User")



Router.get("/profile", GetProfileInfoController);
Router.put("/profile", ProfileUpdateController);
Router.post("/contact", ContactFormController);

module.exports= Router;