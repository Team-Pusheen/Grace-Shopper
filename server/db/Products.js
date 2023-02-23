const client = require('./client');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

const createProduct = async({name, description, price, stock, rarity, imageURL}) =>
{
  const SQL=`
  INSERT INTO products(name, description, price, stock, rarity, "imageURL")
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  ;`
  const response = await client.query(SQL, [name, description, price, stock, rarity, imageURL]);
  return response.rows[0];
}

module.exports = {
    createProduct
  };