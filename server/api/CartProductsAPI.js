const express = require("express");
const router = express.Router();
const {addProduct, changeQuantity, removeItem, emptyCart} = require("../db")
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT;

router.post('/:cartId/:productsId', async(req, res, next) =>
{
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');

        if(auth)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verify(token, JWT);

            const {cartId, productsId} = req.params;
            const {quantity} = req.body;

            const newCartAddition = await addProduct({productsId: productsId, cartId:cartId, quantity:quantity});
            res.send(newCartAddition);
        }
        else{
            res.status(403);

            next({
                name:"NotLoggedIn",
                message: "This user has not logged in and is a guest."
            })
        }
    }catch(error)
    {
        next(error);
    }
})

router.patch('/:cartId/:productsId', async(req, res, next) =>{
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');

        if(auth)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verify(token, JWT);

            const {cartId, productsId} = req.params;
            const {quantity} = req.body;

            const newQuanity = await changeQuantity({cartId:cartId, productsId:productsId, quantity:quantity});
            res.send(newQuanity);
        }
        else{
            res.status(403);
            next({
                name:"NotLoggedIn",
                message: "This user has not logged in and is a guest."
            })
        }
    }catch(error)
    {
        next(error);
    }
})

router.delete('/:cartId/:productId', async (req, res, next) =>{
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');

        if(auth)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verify(token, JWT);

            const {cartId, productId} = req.params;
            const deletedItem = await removeItem({cartId:cartId, productsId:productId});
            res.send(deletedItem);
        }
        else{
            res.status(403);
            next({
                name:"NotLoggedIn",
                message: "This user has not logged in and is a guest."
            })
        }
    }catch(error)
    {
        next(error);
    }
})

router.delete('/:cartId', async(req, res, next) =>{
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    try{
        if(auth)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verify(token, JWT);

            const {cartId} = req.params;
            const nowEmpty = await emptyCart({cartId:cartId});
            res.send(nowEmpty);
        }else{
            res.status(403);
            next({
                name:"NotOwner",
                message:"The user is not logged in."
            })
        }
    }catch(error)
    {
        next(error);
    }

})

module.exports = router;