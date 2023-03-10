const express = require('express');
const router = express.Router();

router.get('/health', async(req,res,next)=>{
    res.send({message:"The server is healthy"});
});

//router for reviews
const reviewsRouter = require("./ReviewsAPI");
router.use("/reviews",reviewsRouter);

//router for cartProducts
const cartProductsRouter = require("./CartProductsAPI");
router.use("/cartProducts",cartProductsRouter);

//router for products
const productsRouter = require("./ProductsAPI");
router.use("/products", productsRouter);

//router for users
const usersRouter = require("./UsersAPI");
router.use("/users",usersRouter);

//router for categories
const categoryRouter = require("./CategoriesAPI");
router.use("/categories", categoryRouter);

//custom error handling
router.use((error, req, res, next) =>{
    res.send({
        error:"Got an error",
        name:error.name,
        message:error.message
    })
})

//error 404 router
router.use((req, res, next) =>{
    res.status(404);
    res.send({message:"Error 404! Page not found."});
})

module.exports = router;