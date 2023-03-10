
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

const deleteProduct = async({id}) => {
  try {
    const { rows:cart_products } = await client.query(`
    DELETE FROM cart_products
    WHERE  "productsId" = $1
    `, [id])
    
    const { rows:reviews } = await client.query(`
    DELETE FROM reviews
    WHERE "productsId" = $1
    `, [id])

    const { rows:categories } = await client.query(`
    DELETE FROM categories
    WHERE "productsId" = $1
    `, [id])

    const { rows } = await client.query(`
    DELETE FROM products
      WHERE id = $1
      RETURNING *
       ;`, [id])

return rows;
  } catch (error) {
    console.log(error)
    throw error
  }
}



// GET ALL PRODUCTS -> GET /api/products
async function getAllProducts(){
  try {
    const { rows } = await client.query(
      `SELECT *
      FROM products
      JOIN categories ON products.id = categories."productsId"
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
  SELECT products.*, category
  FROM products
  JOIN categories ON products.id = categories."productsId"
  WHERE products.id = $1
;`
const { rows } = await client.query(SQL,[id]);
const response = await attachReviews(rows);

return response;
};

// GET PRODUCTS BY CATEGORY -> GET /api/products/:category
async function getProductsByCategory({category}) {
  try {
      const { rows } = await client.query(`
      SELECT *
      from categories
      JOIN products ON categories."productsId" = products.id
      WHERE category = $1;
      `, [category]);
      const response = await attachReviews(rows);
      return response
    
  } catch (error) {
    throw error;
  }
};

async function attachReviews(productArray) {
  try {    
    const finalProduct = productArray.map(async (product) => {
     const reviews = await getReviewsByProductId({productsId: product.id})
     if (reviews) {
      product.reviews = reviews
      delete product.productsId;
     }
     return product
  })
    return await Promise.all(finalProduct);
    // return finalProduct;

  } catch (error) {
    throw error;
  }
};


//change the stock of a product
const changeStockOfProduct = async ({productsId, stock}) =>
{
  try{
    const SQL =`
    UPDATE products
    SET stock = $2
    WHERE id = $1
    RETURNING *
    ;`
    const {rows} = await client.query(SQL, [productsId, stock]);
    
    return rows[0];

  }catch(error)
  {
    throw error;
  }
}


module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  attachReviews,
  changeStockOfProduct
};
