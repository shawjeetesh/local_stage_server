// const { CreateBlankPortFolio, GetPortfolioDataById, GetContactData } = require("../../../controller/main/Home");
// const UserModal = require("../../../models/Users");
// const { VerifyToken } = require('../../../middleware/tokenVerify');
const { CreateNewUser, UsersList } = require("../../../controller/admin/main/Home");

const Route = require("express").Router();

// Route.use(VerifyToken)

Route.get("/", UsersList);
// Route.post("/create", CreateNewUser);

// Route.get("/:id", GetPortfolioDataById);
// Route.get("/contact", GetContactData);



module.exports = Route