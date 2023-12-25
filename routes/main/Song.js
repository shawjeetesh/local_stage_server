const { GetSongListWithFiter, ViewedSong,getPopularSongs } = require('../../controller/admin/main/Song');


const Router = require('express').Router()


Router.get("/popular", getPopularSongs)
Router.get("/:song_id", ViewedSong);
Router.get("/", GetSongListWithFiter);


module.exports= Router;