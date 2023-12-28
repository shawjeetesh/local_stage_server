const { GetCategoryList } = require('../../controller/admin/main/Category');

const Router = require('express').Router()


Router.get("/", GetCategoryList);

module.exports= Router;