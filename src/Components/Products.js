import React from "react";

const Products =({products}) =>
{
    
    
       
    return <div>{products ?<div>
        <h2>Magical Wares</h2>
        <ul>
            {
                products.map((product) =>
                {
                   return <li key={product.id}>{product.name}</li>
                })
            }
        </ul>
        </div>:null}
    </div>
}

export default Products;