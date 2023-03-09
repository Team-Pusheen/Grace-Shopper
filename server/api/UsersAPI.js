const express = require("express");
const router = express.Router();
const {createUser, getUserByUsername, getAllUsers} = require("../db/User");
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

router.get('/', async(req, res, next) =>
{
    try{
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        const admin = req.header('Administrator');

        if(auth && admin)
        {

        }
        else{
            res.status(403);
            next({
                name:"NotAdminError",
                message: "The admin is not logged in or user is not a asmin"
            })
        }
    }catch(error)
    {
        next(error);
    }
})

module.exports = router;