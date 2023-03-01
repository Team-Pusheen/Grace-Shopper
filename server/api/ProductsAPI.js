const express = require("express");
const router = express.Router();
const {getAllProducts} = require("../db")
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT;

router.get('/', async(req, res, next) =>{
    try{
        const products = await getAllProducts();
        res.send(products);

    }catch(error)
    {
        next(error);
    }
})

module.exports = router;