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

const emptyCart = async ({id}) =>{
    const SQL =`
        DELETE FROM cart_products
        WHERE "cartId" =$1
        RETURNING *
    ;`
    try{
        const {rows} = await client.query(SQL, [id]);
        return rows;
    }catch(error)
    {
        throw error
    }
    
}

module.exports = {
    addProduct,
    emptyCart
};