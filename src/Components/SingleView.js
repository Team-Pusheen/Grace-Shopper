import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleView = ({ products }) => {
  // const [products, setProducts] = useState([]);
  const { productsId } = useParams();
  const id = productsId.slice(1);
  const product = products.find((product) => product.id == id * 1);
  if (!product) {
    return null;
  }

  return (
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
    </div>
  );
};

export default SingleView;
