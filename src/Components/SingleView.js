import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleView = ({ products }) => {
  const [cartItems, setCartItems] = useState([]);
  const { productsId } = useParams();
  const id = productsId.slice(1);
  const product = products.find((product) => product.id == id * 1);
  if (!product) {
    return null;
  }

  const addToCart = (e) => {
    e.preventDefault();
    setCartItems([...cartItems, product]);
  }

  return ( product ?
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageURL} />
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
      <form onSubmit={addToCart}  > <button>add to cart</button> </form>
      <button>add to cart</button>
    </div>
    : null
  );
};

export default SingleView;
