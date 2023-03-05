const express = require("express");
const router = express.Router();
const {createUser, getUserByUsername, getUserByToken} = require("../db/User");
const {getUserCart} = require("../db/Carts");
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

//create a user
router.post('/register', async(req, res, next) =>
{   
    const {username,password,name,email,isAdministrator} =req.body;
    try{

        const userExists = await getUserByUsername({username});

        if(!userExists)
        {
            const newUser = await createUser({username:username, password:password,name:name, email:email, isAdministrator:isAdministrator});
            res.send({
                name: 'Welcome',
                message: `Welcome ${username}, to the Pusheen Baazar!`,
                user:newUser
            });
        }
        else{
            next({
                name:"UserExistsError",
                message: `Username ${username} is already taken.`
            })
        }

        
    }catch(error){
        next(error);
    }
})

//get user's cart
router.get('/:userId/cart', async(req, res, next) =>{

    const {userId} = req.params;
    
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        if(auth)
        {
            const userCart = await getUserCart({userId:userId});
            res.send(userCart);
        }else{
            res.status(403);
            next({
                name:"NotLoggedIn",
                message:"The user is not logged in"
            });
        }

        
    }catch(error)
    {
        next(error);
    }

})

//get user's information via token
router.get('/me', async(req, res, next) =>
{

    try{
        const prefix ='Bearer ';
        const auth = req.header('Authorization');

        if(auth){
            const token = auth.slice(prefix.length);
            
            const userInfo = await getUserByToken(token);
            res.send(userInfo);
        }else{
            next({
                name:"NeedLogin",
                message:"You must be logged in to do this action"
            })
        }

        
    }catch(error)
    {
        next(error);
    }
})

module.exports = router;