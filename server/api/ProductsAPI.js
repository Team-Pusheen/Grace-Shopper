const express = require("express");
const router = express.Router();
const {getAllProducts, getProductsByCategory} = require("../db")
const {getProductById} = require("../db/Products");
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

router.get('/category/:category', async(req, res, next) =>
{
    try{
        const {category} = req.params;

        const products = await getProductsByCategory({category:category});
        res.send(products);
    }catch(error)
    {
        next(error);
    }
})

router.get('/:productId', async(req, res, next) =>
{
    try{
        const {productId} = req.params;
        const product = await getProductById({id:productId})
        res.send(product);
    }catch(error)
    {
        next(error);
    }
})

module.exports = router;