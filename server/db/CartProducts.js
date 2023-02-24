const client = require('./client');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

const addProduct = async ({productsId, cartId, quantity}) => {
    const SQL = `
    INSERT INTO cart_products("productsId", "cartId", quantity)
    VALUES ($1, $2, $3)
    RETURNING *
    `
}