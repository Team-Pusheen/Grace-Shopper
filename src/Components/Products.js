import React from "react";
import { Link } from "react-router-dom";

const Products =({products}) =>
{
    
    
       
    return <div>{products ?<div>
        <h2>Magical Wares</h2>
        <ul>
            {
                products.map((product) =>
                {
                   return <li key={product.id}><Link to={`/products/:${product.id}`}>{product.name}</Link></li>
                })
            }
        </ul>
        </div>:null}
    </div>
}

export default Products;