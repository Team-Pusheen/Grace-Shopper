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

const getReviewsByProductId = async({productsId}) =>
{
    const SQL =`
        SELECT *
        FROM reviews
        WHERE "productsId" = $1
    ;`

    const {rows} = await client.query(SQL,[productsId]);
    return rows;
}

const getReviewsByUserId = async({userId}) =>
{
    const SQL =`
        SELECT *
        FROM reviews
        WHERE "userId" = $1
    ;`

    const {rows} = await client.query(SQL,[userId]);
    return rows;
}

module.exports ={
createReview,
getReviewsByProductId,
getReviewsByUserId,
}