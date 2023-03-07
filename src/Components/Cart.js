import React from "react";
import {deleteFromCart} from "../fetchFunctions";

const Cart =({cart}) =>
{   

    console.log(cart);

    const removeItem = async(cartId, productId) =>
    {
        const removedItem = await deleteFromCart(cartId, productId);
    }

    return <div>
        <h3>Your Cart:</h3>
        {cart ?
            cart.map((item) =>
            {   
                return<div key={item.id}>
                    <h3>{item.product.name}</h3>
                    <img src={item.product.imageURL}></img>
                    <p>Amount: {item.quantity}</p>
                    <button onClick={() =>removeItem(item.id,item.product.id )}>X</button>
                </div>
            })
        :null}
        {cart.length >0 ? <button>Purchase Wares</button>:<button disabled>Purchase Wares</button>}
    </div>
}

export default Cart;