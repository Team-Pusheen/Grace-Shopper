const express = require('express');
const router = express.Router();

//router for reviews
const reviewsRouter = require("./ReviewsAPI");
router.use("/reviews",reviewsRouter);

//router for cartProducts
const cartProductsRouter = require("./CartProductsAPI");
router.use("/cartProducts",cartProductsRouter);


module.exports = router;