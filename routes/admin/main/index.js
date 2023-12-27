// const { CreateBlankPortFolio, GetPortfolioDataById, GetContactData } = require("../../../controller/main/Home");
// const UserModal = require("../../../models/Users");
// const { VerifyToken } = require('../../../middleware/tokenVerify');
// const UsersRouteAdmin = require('./users');
// const ArtistsRouteAdmin = require('./artists');
const GenresRouteAdmin = require('./category');
// const SongRouteAdmin = require('./songs');
// const AlbumsRouteAdmin = require('./albums');
// const { CreateNewUser, UsersList } = require("../../../controller/admin/main/Home");

const Route = require("express").Router();

// Route.use(VerifyToken)

// Route.use("/users-list", UsersRouteAdmin);
// Route.use("/artists", ArtistsRouteAdmin);
Route.use("/category", GenresRouteAdmin);
// Route.use("/songs", SongRouteAdmin);
// Route.use("/albums", AlbumsRouteAdmin);
// Route.post("/create", CreateNewUser);

// Route.get("/:id", GetPortfolioDataById);
// Route.get("/contact", GetContactData);
Route.get("/contact", (req, res)=>{
    return res.send("admin2")
});


module.exports = Route