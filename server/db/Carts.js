const client = require('./client');
const {getProductById} = require('./Products');

const createCart = async ({userId}) => {
    const SQL = `
        INSERT INTO carts ("userId")
        VALUES ($1)
        RETURNING *
    ;`
        const {rows} = await client.query(SQL, [userId]);
        return rows[0].id;
}

async function getUserCart ({userId}) {
    const SQL = `
        SELECT id FROM carts
        WHERE "userId" = $1
    ;`
    const {rows:[id]} = await client.query(SQL, [userId]);
    
    
    const {rows} = await client.query(`SELECT * FROM cart_products WHERE "cartId" = id;`);
    
    const cart = rows.map(async(cartItem) =>
    {
        
        const item = await getProductById({id:cartItem.productsId});
        cartItem.product =item;
        return cartItem;
    })

    return await Promise.all(cart);

}

module.exports={createCart, getUserCart}