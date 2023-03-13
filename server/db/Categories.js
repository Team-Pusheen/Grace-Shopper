const client = require("./client");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;


const createCategory = async({productsId, category}) => 
{
    const SQL = `
    INSERT INTO categories("productsId", category)
    VALUES ($1, $2)
    RETURNING *
    ;`

    const response = await client.query(SQL, [productsId, category]);
    return response.rows[0].category;
}

const updateCategory = async({productsId, category}) =>
{
    const SQL =`
    UPDATE categories
    SET category = $2
    WHERE "productsId" = $1
    RETURNING *
    ;`

    const {rows} = await client.query((SQL, [productsId, category]));
    return rows[0].category;
}

module.exports ={
createCategory,
updateCategory
};

