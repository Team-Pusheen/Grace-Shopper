/*const express = require("express");
const router = express.Router();
const {createReview} = require("../db")
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT;

//create review
router.post('/:productsId/:userId', async(req, res, next) =>
{
    try{
        const prefix ='Bearer ';
        const auth = req.header('Authorization');

        if(auth)
        {
            const token = auth.slice(prefix.length);
            const user = jwt.verif(token, JWT);
            
            const {productsId, userId} = req.body;

            const newReview = await createReview({productsId, userId});
            res.send(newReview);
        }
        else{
            next({
                name:"NeedToLogin",
                message:"To write a review please login."
            })
        }
    }catch(error){
        next(error);
    }
    
})
*/