const { GetGenreList } = require('../../controller/admin/main/Genre');

const Router = require('express').Router()


Router.get("/", GetGenreList);

module.exports= Router;