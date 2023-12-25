// const { CreateBlankPortFolio, GetPortfolioDataById, GetContactData } = require("../../../controller/main/Home");
// const UserModal = require("../../../models/Users");
// const { VerifyToken } = require('../../../middleware/tokenVerify');
const multer = require("multer");
const { storage, audioStorage } = require("../../../common/localUpload");
const { GetArtistsList, AddArtistsList, DeleteArtistsList } = require("../../../controller/admin/main/Artist");
const { CreateNewUser, UsersList } = require("../../../controller/admin/main/Home");
const { AddSongList, DeleteSongList, GetSongListWithFiter } = require("../../../controller/admin/main/Song");

const Route = require("express").Router();
const upload = multer({
    storage: storage("./public/upload"),
    // fileFilter: (req, file, cb) => {
    //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype ==="file" ) {
    //     cb(null, true);
    //   } else {
    //     cb(null, false);
    //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //   }
    // }
  })
  var cpUpload = upload.fields([{ name: 'imagefile', maxCount: 1 }, { name: 'audiofile', 
  maxCount: 1 }])

// Route.use(VerifyToken)
Route.delete("/:id",DeleteSongList);
Route.post("/add", cpUpload , AddSongList);
Route.get("/",GetSongListWithFiter);
// Route.delete("/delete", DeleteArtistsList);

// Route.post("/create", CreateNewUser);

// Route.get("/:id", GetPortfolioDataById);
// Route.get("/contact", GetContactData);



module.exports = Route