const express = require("express");
const router = express.Router();
const {createUser, getUserByUsername} = require("../db/User")
const jwt = require('jsonwebtoken')
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

})

//get user's information
router.get('/userId/me', async(req, res, next) =>
{
    
})

module.exports = router;