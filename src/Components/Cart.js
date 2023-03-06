import React, {useState} from "react";


const Cart =({cart, products}) =>
{
    const [cartItems, setCartItems] = useState([]);

    const findItems = async() =>
    {
        const itemArray=[];

    for(let i=0; i<cart.length; i++)
    {
        const foundItem = products.find((product) =>
        {
            return product ? product.id === cart[0].productsId:null;
        })
        itemArray.push(foundItem);
    }
        console.log(itemArray);
        setCartItems(itemArray);

    }
    

    if(cartItems.length ===0 && cart.length>0)
    {  
        //findItems();
    }

    return <div>
        <h3>Your Cart:</h3>
        {/*cart ?
            cart.map((item) =>
            {   
                return<div key={item.id}>
                    <p>Amount: {item.quantity}</p>
                </div>
            })
        :null */}
    </div>
}

export default Cart;