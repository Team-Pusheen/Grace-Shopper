import React, {useState, useEffect} from "react";
import {deleteFromCart, dumpCart} from "../fetchFunctions";

const Cart =({cart, setCart}) =>
{   
    const [totalPrice, setTotalPrice] = useState("");

    console.log(cart);

    useEffect(() =>
    {
        const cost = cart.reduce((total,item) => total + (item.quantity * item.product.price),0)
        setTotalPrice(cost);
    },[cart])
    

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
        setCart(newCart);

    }

    const purchase = async() =>
    {   const id =cart[0].cartId;
        const emptyCart = await dumpCart(id);
        setCart([]);
    }

    return <div>
        <h3>Your Cart:</h3>
        {cart.length>0 ?
            cart.map((item) =>
            {   
                return<div key={item.id}>
                    <h3>{item.product.name}</h3>
                    <img src={item.product.imageURL}></img>
                    <p>Amount: {item.quantity}</p>
                    <p>{item.quantity * item.product.price} copper coins</p>
                    <button onClick={() =>removeItem(item.cartId,item.product.id )}>X</button>
                </div>
            })
        :null}
        {cart.length >0 ? 
        <>
        <h2>Total: {totalPrice} copper coins</h2>
        <button onClick={purchase}>Purchase Wares</button></>
        :<button disabled>Purchase Wares</button>}
    </div>
}

export default Cart;