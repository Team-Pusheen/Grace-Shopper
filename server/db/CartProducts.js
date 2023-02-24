const client = require('./client');

const addProduct = async ({productsId, cartId, quantity}) => {
    const SQL = `
    INSERT INTO cart_products("productsId", "cartId", quantity)
    VALUES ($1, $2, $3)
    RETURNING *
    ;`

    const response = await client.query(SQL, [productsId, cartId, quantity]);
    return response.rows[0];
}

module.exports = {
    addProduct
};