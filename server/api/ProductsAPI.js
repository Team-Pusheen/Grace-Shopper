const express = require("express");
const router = express.Router();
const {getAllProducts, getProductsByCategory} = require("../db")
const {getProductById, createProduct} = require("../db/Products");
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

router.post('/', async(req,res,next) =>
{
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        //ask about how to handle administrator check.
        const {isAdministrator} = req.body;

        if(auth && isAdministrator)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verify(token, JWT);

            const {name, description, price, stock, rarity, imageURL, category} = req.body
            const newProduct = await createProduct({name:name, description:description, price:price, stock:stock, rarity:rarity, imageURL:imageURL, category:category});
            res.send(newProduct);
        }else{
            res.status(403);

            next({
                name:"NotAdmin",
                message: "This user is not a Admin."
            })
        }
    }catch(error)
    {
        next(error);
    }
})

router.patch('/:productsId', async(req, res, next) =>{
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        //ask about how to handle administrator check.
        const {isAdministrator} = req.body;

        if(auth && isAdministrator)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verify(token, JWT);
        }else{

        }

    }catch(error)
    {
        next(error);
    }
})

router.delete('/productsId', async(req, res, next) =>{
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        //ask about how to handle administrator check.
        const {isAdministrator} = req.body;

        if(auth && isAdministrator)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verify(token, JWT);
        }else{
            res.status(403);
            next({
                name:"NotAuthoried",
                message:"The user is not authorized to do this."
            })
        }
    }
    catch(error)
    {
        next(error);
    }
})

module.exports = router;