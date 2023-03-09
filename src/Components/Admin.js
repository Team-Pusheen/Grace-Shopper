import React, {useState} from "react";
import { GiQuill } from "react-icons/gi";

const Admin = ({products, adminInfo})=>
{
    const [userList, setUserList] = useState([]);

    const getAllUsers = async() =>
    {

    }

    if(!userList.length >0)
    {
        getAllUsers();
    }

    return <div><h1>Welcome Admin {adminInfo.name}!</h1>
    <div id="AdminPage">
    {
       products ? <div>
                <h2>Products</h2>
                
                {
                   <div id="productsList">
                    {
                    products.map((product) =>
                    {
                        return <div key={product.id} cla="productInfo">
                                <ul>
                                    <h3>{product.name}</h3>
                                    <button><GiQuill /></button>
                                    <ul>
                                        <li>Description: {product.description}</li>
                                        <li>Price: {product.price} copper coins</li>
                                        <li>Stock: {product.stock}</li>
                                        <li>Rarity: {product.rarity}</li>
                                        <li>category: {product.category}</li>
                                        <li>image UR: {product.imageURL}</li>
                                    </ul>
                                </ul>
                            </div>
                    })
                }</div>
                }
            
         </div>: null
        }
        <div id="updateForms"><p>update forms go</p></div>
        {
            userList ? <h2>Users</h2>:null
        }
        </div>
    </div>
}

export default Admin;