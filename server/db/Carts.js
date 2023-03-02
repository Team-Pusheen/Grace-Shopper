const client = require('./client');

const createCart = async ({userId}) => {
    const SQL = `
        INSERT INTO carts ("userId")
        VALUES ($1)
        RETURNING *
    ;`
        const {rows} = await client.query(SQL, [userId]);
        return rows[0].id;
}

const getUserCart = async ({userId}) => {
    const SQL = `
        SELECT id FROM carts
        WHERE "userId" = $1
    ;`
    const {rows:[id]} = await client.query(SQL, [userId]);
    
    const {rows} = await client.query(`SELECT * FROM cart_products WHERE "cartId" = $1;`,[id]);
    return rows;

}

module.exports={createCart, getUserCart}