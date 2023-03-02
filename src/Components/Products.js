import React from "react";

const Products =({products}) =>
{
    
    /*const grabProducts = async() =>
    {
        const allProducts = await getProducts();
        setProducts(allProducts);
        console.log(products);
    }

    if(products.length===0)
    {
        grabProducts();
    }*/
    
       
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