const client = require('./client');

const addProduct = async ({productsId, cartId, quantity}) => {
   
    const exists = await productExitsCheck({productsId:productsId, cartId:cartId})
   if(!exists)
   {
   
    const SQL = `
    INSERT INTO cart_products("productsId", "cartId", quantity)
    VALUES ($1, $2, $3)
    RETURNING *
    ;`

    const response = await client.query(SQL, [productsId, cartId, quantity]);
    return response.rows[0];
   }
   else{
    const newAmount = await changeQuantity({productsId:productsId, cartId:cartId, quantity:quantity});
    return newAmount;
   }
}

const emptyCart = async ({cartId}) =>{
    const SQL =`
        DELETE FROM cart_products
        WHERE "cartId" =$1
        RETURNING *
    ;`
    try{
        const {rows} = await client.query(SQL, [cartId]);
        return rows;
    }catch(error)
    {
        throw error
    }
    
}

const removeItem = async({cartId, productsId}) =>{
    const SQL =`
        DELETE FROM cart_products
        WHERE "cartId" = $1
        AND "productsId" = $2
        Returning *
    ;`
    try{
        const {rows} = await client.query(SQL, [cartId, productsId]);
        return rows;
    }catch(error)
    {
        throw error;
    }
}

const changeQuantity = async({cartId, productsId, quantity}) =>
{
    const SQL = `
        UPDATE cart_products
        SET quantity = $3
        WHERE "cartId" = $1
        AND "productsId" = $2
        RETURNING *
    ;`
    try{
        const {rows} = await client.query(SQL,[cartId, productsId, quantity]);
        return rows[0];
    }catch(error)
    {
        throw error;
    }
}

//Ask the instructers about
const productExitsCheck = async ({cartId, productsId}) =>{
    const SQL =`
        SELECT * FROM cart_products
        WHERE "cartId" = $1
        AND "productsId" = $2
    ;`
    const {rows} = await client.query(SQL,[cartId, productsId]);
    
    if(rows.length >0)
    {
        console.log(rows[0]);
        return rows[0].quantity;
    }
    else{
        return;
    }
    
}

module.exports = {
    addProduct,
    emptyCart,
    removeItem,
    changeQuantity,
    productExitsCheck
};