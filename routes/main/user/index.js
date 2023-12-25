// const { CreateBlankPortFolio, GetPortfolioDataById, GetContactData } = require("../../../controller/main/Home");
const UserModal = require("../../../models/Users");
const { VerifyToken } = require('../../../middleware/tokenVerify');

const Route = require("express").Router();

Route.use(VerifyToken)
// Route.get("/create", CreateBlankPortFolio);

// Route.get("/:id", GetPortfolioDataById);
// Route.get("/contact", GetContactData);


module.exports = Route