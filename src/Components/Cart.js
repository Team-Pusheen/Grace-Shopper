import React, {useState} from "react";


const Cart =({cart}) =>
{
    return <div>
        {
            cart.map((item) =>
            {   
                //go get the items by product id.
                return<div key={item.id}>
                    <p>Amount: {item.quantity}</p>
                </div>
            })
        }
    </div>
}

export default Cart;