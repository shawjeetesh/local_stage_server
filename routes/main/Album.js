const { GetAlbumList, AddAlbumList, AddSongInAlbum, DeleteAlbumList, DeleteSongInAlbum, GetAlbumSongs, GetRandomAlbums } = require('../../controller/admin/main/Album');
const multer = require("multer");
const { storage } = require("../../common/localUpload");

const Router = require('express').Router()

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


Router.get("/", GetAlbumList);
Router.get("/random", GetRandomAlbums);
Router.get("/:id", GetAlbumSongs);
Router.post("/add", upload.single("file"),AddAlbumList);
Router.put("/:id/add", AddSongInAlbum);
Router.delete("/:id/:song_id", DeleteSongInAlbum);
Router.delete("/:id", DeleteAlbumList);

module.exports= Router;