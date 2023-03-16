import React, {useState, useEffect} from "react";
import {deleteFromCart, dumpCart, reduceStock, cartAmountUpdate, grabUserCart} from "../fetchFunctions";


const Cart =({cart, setCart, id, setProductChange}) =>
{   
    const [totalPrice, setTotalPrice] = useState("");
    const [purchaseMade, setPurchaseMade] = useState(false);
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
    {           
        //alter the stock of the item
        for(let i=0; i< cart.length; i++)
        {
            const newStock = cart[i].product.stock - cart[i].quantity;
            await reduceStock(cart[i].product.id, newStock);
        }
         
        //empty the cart
        const id =cart[0].cartId;
        await dumpCart(id);
        setCart([]);
        setProductChange(true);
        setPurchaseMade(true);
    }

    const add = async(productsId, quantity, cartId, stock) =>
    {
        const newAmount = quantity +1;
        if(newAmount < stock)
        {
            await cartAmountUpdate(cartId, productsId, newAmount);
            await newCart();
        }

    }

    const subtract = async(productsId, quantity, cartId) =>
    {
        const newAmount = quantity -1;
        if(newAmount >0)
        {
            await cartAmountUpdate(cartId, productsId, newAmount)
            await newCart();
        }
        else if(newAmount <=0)
        {
            await removeItem(cartId, productsId);
        }
    }

    const newCart = async() =>
    {
        const updatedCart = await grabUserCart(id);
        setCart(updatedCart);

    }

    return <div className='full-cart-container'>
        <h3>Your Cart:</h3>
        {cart.length>0 ?
           cart.map((item) => {   
            return (
              <div className="cart-container" key={item.id}>
                <div className="cart-card">
                  <img className='cart-card-item' src={item.product.imageURL}></img>
                  <div className='cart-card-item' id='cart-description'>
                    <div id='cart-card-header'>
                      <p><b>{item.product.name}</b> </p>
                    </div>
                    <div id='quantity-container'>                        
                      <div>
                        Amount: 
                        <button className="quantity-btn" onClick={() => subtract(item.product.id, item.quantity, item.cartId)}>-</button>
                        {item.quantity}
                        <button className="quantity-btn" onClick={() => add(item.product.id, item.quantity, item.cartId, item.product.stock)}>+</button>
                        <p>{item.quantity * item.product.price} copper coins</p>
                      </div>
                    </div>
                  </div>
                  <button id='remove-btn' onClick={() => removeItem(item.cartId,item.product.id)}>X</button>
                </div>
              </div>
            );
          })

            
        :null}
        {cart.length >0 ? 
        <div className="cart-checkout">
        <h2>Total: {totalPrice} copper coins</h2>
        <button className="purchase-btn" onClick={purchase}>Purchase Wares</button>
        </div>
        :<button className="purchase-btn" disabled >Purchase Wares</button>}
        {purchaseMade ? <h1>Thank you for your patronage! (=^-ω-^=)</h1>:null}
    </div>
}

export default Cart;