import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';





const ViewProduct = ({products}) => {
    console.log()
    const [products, setProducts] = useState([]);

    const {productId} = useParams();
    const product = products.find(product => product.id === id*1);
    if(!product){
        return null;
    }


return <div>
    <ul>
        {<h1>product.name</h1>

        }
    </ul>
       </div>

}


export default SingleView;