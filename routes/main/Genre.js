const { GetGenreList } = require('../../controller/admin/main/Category');

const Router = require('express').Router()


Router.get("/", GetGenreList);

module.exports= Router;