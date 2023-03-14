const express = require("express");
const router = express.Router();
const {getAllCategories} = require("../db/Categories")
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT;


router.get('/', async(req, res, next) =>
{
    try{
        const categoriesList = await getAllCategories();
        res.send(categoriesList);
    }catch(error)
    {
        next(error);
    }
})

module.exports = router;