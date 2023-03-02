const client = require('./client');

const createCart = async ({userId}) => {
    const SQL = `
        INSERT INTO carts("userId")
        VALUES ($1)
        RETURNING *
    ;`
        const {rows} = await client.query(SQL, [userId]);
        console.log(rows);
        return rows[0].id;
}

async function getUserCart ({userId}) {
    const SQL = `
        SELECT id FROM carts
        WHERE "userId" = $1
    ;`
    const {rows:[id]} = await client.query(SQL, [userId]);
    
    console.log(id);
    const {rows} = await client.query(`SELECT * FROM cart_products WHERE "cartId" = id;`);
    //console.log(rows);
    return rows;

}

module.exports={createCart, getUserCart}