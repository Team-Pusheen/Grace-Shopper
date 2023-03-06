import React, {useState} from "react";


const Cart =({cart, products}) =>
{   

    console.log(cart);

    return <div>
        <h3>Your Cart:</h3>
        {cart ?
            cart.map((item) =>
            {   
                return<div key={item.id}>
                    <h3>{item.item[0].name}</h3>
                    <p>Amount: {item.quantity}</p>
                </div>
            })
        :null}
    </div>
}

export default Cart;