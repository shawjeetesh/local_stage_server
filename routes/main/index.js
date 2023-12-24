const Router = require('express').Router()
const UserRouter = require("./User")
const ContactRouter = require("./Contact")
const ArtistRouter = require("./Artist")
const GenreRouter = require("./Genre")
const SongRouter = require("./Song")
const AlbumRouter = require("./Album")
const { VerifyToken } = require('../../middleware/tokenVerify')


Router.use(VerifyToken)
Router.use("/main", UserRouter)
Router.use("/artists", ArtistRouter)
Router.use("/categories", GenreRouter)
Router.use("/songs", SongRouter)
Router.use("/albums", AlbumRouter)

Router.get("/", (req, res)=>{
    console.log(req.headers);
    res.send("success")
})
module.exports = Router