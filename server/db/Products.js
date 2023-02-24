const client = require('./client');
const jwt = require('jsonwebtoken');
const { createCategory } = require('./Categories');
const JWT = process.env.JWT;

const createProduct = async({name, description, price, stock, rarity, imageURL, category}) =>
{
  const SQL=`
  INSERT INTO products(name, description, price, stock, rarity, "imageURL")
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  ;`
  const response = await client.query(SQL, [name, description, price, stock, rarity, imageURL]);
  const productsId = response.rows[0].id;
  const categories = await createCategory({productsId, category});
  response.rows[0].categories = categories;
  return response.rows[0];
}


module.exports = {
    createProduct
  };