const client = require("./client");

const createReview = async ({productsId, userId, review}) =>
{
    const SQL =`
        INSERT INTO reviews("productsId", "userId", review)
        VALUES($1, $2, $3)
        RETURNING *
    ;`

    const {rows} = await client.query(SQL,[productsId, userId, review]);
    return rows[0];
}

module.exports ={
createReview
}