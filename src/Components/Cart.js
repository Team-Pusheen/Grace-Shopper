import React from "react";
import {deleteFromCart} from "../fetchFunctions";

const Cart =({cart, setCart}) =>
{   

    console.log(cart);

    const removeItem = async(cartId, productId) =>
    {
        console.log(productId);
        const removedItem = await deleteFromCart(cartId, productId);
        console.log(removedItem);
        const itemObj = removedItem[0];

        const newCart = cart.filter((item) =>
        {
            return item.id != itemObj.id;
        })
        console.log(newCart);
        setCart(newCart);

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
                    <button onClick={() =>removeItem(item.cartId,item.product.id )}>X</button>
                </div>
            })
        :null}
        {cart.length >0 ? <button>Purchase Wares</button>:<button disabled>Purchase Wares</button>}
    </div>
}

export default Cart;