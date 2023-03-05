import React, {useState} from "react";


const Cart =({cart, products}) =>
{
    const [cartItems, setCartItems] = useState([]);

    const itemArray=[];
    for(let i=0; i<cart.length; i++)
    {
        itemArray = products.find((product) =>
        {
            return product ? product.id === cart.productsId:null;
        })
    }

    setCartItems(itemArray);

    return <div>
        {cartItems ?
            cart.map((item) =>
            {   
                return<div key={item.id}>
                    <p>Amount: {item.quantity}</p>
                </div>
            })
       :null }
    </div>
}

export default Cart;