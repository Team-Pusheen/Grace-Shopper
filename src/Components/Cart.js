import React from "react";


const Cart =({cart}) =>
{   

    console.log(cart);

    const removeItem = async(id) =>
    {
        const removedItem = await deleteFromCart(id);
        
    }

    return <div>
        <h3>Your Cart:</h3>
        {cart ?
            cart.map((item) =>
            {   
                return<div key={item.id}>
                    <h3>{item.product[0].name}</h3>
                    <p>Amount: {item.quantity}</p>
                    <button onClick={() =>removeItem(item.id)}>X</button>
                </div>
            })
        :null}
        {cart.length >0 ? <button>Purchase Wares</button>:<button disabled>Purchase Wares</button>}
    </div>
}

export default Cart;