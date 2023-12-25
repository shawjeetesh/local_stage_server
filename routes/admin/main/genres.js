// const { CreateBlankPortFolio, GetPortfolioDataById, GetContactData } = require("../../../controller/main/Home");
// const UserModal = require("../../../models/Users");
// const { VerifyToken } = require('../../../middleware/tokenVerify');
const { GetGenreList, AddGenreList, DeleteGenreList } = require("../../../controller/admin/main/Genre");
const { CreateNewUser, UsersList } = require("../../../controller/admin/main/Home");

const multer = require('multer');
const { storage } = require("../../../common/localUpload");
// const { storage } = require('../../../middleware/upload');
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
const Route = require("express").Router();

// Route.use(VerifyToken)



Route.post("/add", upload.single("file"), AddGenreList);
Route.delete("/:id",DeleteGenreList);
Route.get("/", GetGenreList);
// Route.post("/create", CreateNewUser);

// Route.get("/:id", GetPortfolioDataById);
// Route.get("/contact", GetContactData);



module.exports = Route