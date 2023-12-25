// const { CreateBlankPortFolio, GetPortfolioDataById, GetContactData } = require("../../../controller/main/Home");
// const UserModal = require("../../../models/Users");
// const { VerifyToken } = require('../../../middleware/tokenVerify');
const multer = require("multer");
const { storage } = require("../../../common/localUpload");
const { GetArtistsList, AddArtistsList, DeleteArtistsList, GetArtistsListWithFiter } = require("../../../controller/admin/main/Artist");
const { CreateNewUser, UsersList } = require("../../../controller/admin/main/Home");

const Route = require("express").Router();
const upload = multer({
    storage: storage("./public/upload"),
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  })

// Route.use(VerifyToken)

Route.post("/add",upload.single("file"),  AddArtistsList);
Route.delete("/:id", DeleteArtistsList);
// Route.get("/:name/:offset/:limit", GetArtistsListWithFiter);
Route.get("/", GetArtistsList);

// Route.post("/create", CreateNewUser);

// Route.get("/:id", GetPortfolioDataById);
// Route.get("/contact", GetContactData);



module.exports = Route