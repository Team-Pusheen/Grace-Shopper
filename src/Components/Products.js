import React from "react";

const Products =({products}) =>
{
    
    
       
    return <div>{products ?<div>
        <h2>Magical Wares</h2>
        <div className="cardContainer">
            {
                products.map((product) =>
                {
                   return <div className="card" id={product.id}>
                    
                    <p><img src={product.imageURL} /></p>
                    <h3>{product.name}</h3>
                    <p>{product.price} Copper Coins</p>
                    </div>
                })
            }
        </div>
        </div>:null}
    </div>
}

export default Products;