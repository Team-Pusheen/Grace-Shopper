
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Products =({products, categoryList}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  
  const filteredProducts = selectedCategory ? 
    products.filter(product => product.category === selectedCategory) :
    products;

  return (
    <div className="products-container">
      <h2>Magical Wares</h2>
   
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value={""}>All Categories</option>
        {categoryList.map(category => <option key={category} value={category}>{category}</option>)}
      </select>
      <div className="cardContainer">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card" id={product.id}>
            <Link to={`/products/:${product.id}`}> <img src={product.imageURL} /></Link>
            <h3><Link to={`/products/:${product.id}`}>{product.name}</Link></h3>
            <p>{product.price} Copper Coins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;