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

module.exports={createCart}