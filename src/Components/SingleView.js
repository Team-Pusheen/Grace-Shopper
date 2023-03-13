import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {toCart, grabUserCart, cartAmountUpdate } from "../fetchFunctions";


const SingleView = ({ products, cartId, setCart, cart, userId }) => { 
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { productsId } = useParams();
  const id = productsId.slice(1);
  const product = products.find((product) => product.id == id * 1);
 

  useEffect(()=>{
    const updateCart = async()  => {
      const userCart = await grabUserCart(userId);
      setCart(userCart);
    }
    updateCart();
  },[cartItems])

  const addToCart = async (e) => {
    e.preventDefault();
    const itemExists = cart.find((item) => item.product.id === product.id);
    console.log(itemExists);
    if (itemExists) {
      const updateItem = await cartAmountUpdate(cartId, id, itemExists.quantity + 1)
      setCartItems(updateItem)
    } else {
   const newAddedItem = await toCart ( cartId, id, 1);
    setCartItems([...cart, newAddedItem]);
  }
  }

  return ( product ?
    <div className="product-wrapper">
      <div className="single-product-container">
        <div className="single-product-card">
          <div className="product-header">
            <h1>{product.name}</h1>
            <img src={product.imageURL} />
          </div>
          <p>
            <b>description: </b>
            {product.description}
          </p>
          <p>
            <b>price: </b>
            {product.price}
          </p>
          <p>
            <b>stock: </b>
            {product.stock}
          </p>
          <p>
            <b>rarity: </b>
            {product.rarity}
          </p>
          <p>
            <b>category: </b>
            {product.category}
          </p>
          <form onSubmit={addToCart}  > <button className="cart-btn">add to cart</button> </form> 
        </div>
      </div>
    </div>
    : null
  );
};

export default SingleView;
