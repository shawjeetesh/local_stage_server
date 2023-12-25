const Router = require('express').Router()
const { GetArtistsList } = require('../../controller/admin/main/Artist');
const { GetProfileInfoController } = require("../../controller/main/User")



Router.get("/", GetArtistsList);

module.exports= Router;