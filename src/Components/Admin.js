import React, {useState} from "react";
import { GiQuill } from "react-icons/gi";
import { allUsers } from "../fetchFunctions";

const Admin = ({products, adminInfo})=>
{
    const [userList, setUserList] = useState([]);

    const getAllUsers = async() =>
    {
        setUserList( await allUsers(adminInfo.isAdministrator));
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
        <div id="updateForms"><p>update forms go here</p></div>
        {
            userList ? 
            <div>
                <h2>Users</h2>
                <div id="userList">
                    {
                        userList.map((user) =>
                        {
                            return<div key={user.id}>
                                <ul>
                                    <h3>Username: {user.username}</h3>
                                    <li>Email: {user.email}</li>
                                    <li>Admin Status: {user.isAdministrator}</li>
                                </ul>
                                </div>
                        })
                    }
                </div>
            </div>:null
        }
        </div>
    </div>
}

export default Admin;