import React from "react";
import { Link } from "react-router-dom";

const Products =({products}) =>
{
    
    
       
    return <div>{products ?<div className="products-container">
        <h2>Magical Wares</h2>
        <div className="cardContainer">
            {
                products.map((product) =>
                {

                   return <div key={product.id} className="card" id={product.id}>
                    
                    <Link to={`/products/:${product.id}`}> <img src={product.imageURL} /></Link>
                    <h3><Link to={`/products/:${product.id}`}>{product.name}</Link></h3>
                    <p>{product.price} Copper Coins</p>
                  
                    </div>

                })
            }
        </div>
        </div>:null}
    </div>
}

export default Products;