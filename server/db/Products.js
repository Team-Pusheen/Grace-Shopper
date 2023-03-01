
const client = require('./client');
const jwt = require('jsonwebtoken');
const { createCategory } = require('./Categories');
const { getReviewsByProductId } = require('./Reviews')
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
};



// GET ALL PRODUCTS -> GET /api/products
async function getAllProducts(){
  try {
    const { rows } = await client.query(
      `SELECT *
      FROM products
      ;`
    );
    const response = await attachReviews(rows);
    return response;

  } catch (error) {
    throw error;
  }
};

// GET PRODUCTS BY ID -> GET /api/products/:productId
async function getProductById({id}) {
  const SQL =`
  SELECT *
  FROM products
  WHERE id = $1
;`
const { rows } = await client.query(SQL,[id]);
const response = await attachReviews(rows);

return response;
};

// GET PRODUCTS BY CATEGORY -> GET /api/products/:category
async function getProductsByCategory({productsId}) {
  try {
      const SQL =`
      SELECT *
      from categories
      WHERE "productsId" = $1
      ;`

      const { rows } = await client.query(SQL,[productsId])
      const response = await attachReviews(rows);

      return response;
  } catch (error) {
    throw error;
  }
}

async function attachReviews(productArray) {
  try {    
    const finalProduct = productArray.map(async (product) => {
     const reviews = await getReviewsByProductId({productsId: product.id})
     if (reviews) {
      product.reviews = reviews
     }
     return product
  })
    return await Promise.all(finalProduct);
    // return finalProduct;

  } catch (error) {
    throw error;
  }
}



module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  attachReviews
};
