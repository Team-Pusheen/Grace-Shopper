import React, {useState} from "react";
import { GiQuill } from "react-icons/gi";
import { allUsers, removeProduct} from "../fetchFunctions";
import UpdateForm from "./UpdateForm";
import AddProduct from "./AddProduct";

const Admin = ({categoryList, products, adminInfo, setProductChange})=>
{
    const [userList, setUserList] = useState([]);
    const [editProduct, setEditProduct] =useState({});
    const [canAdd, setCanAdd] = useState(false);
    
    const canEdit = (product) =>
    {
        if(!canAdd)
        {
            setEditProduct(product);
        }
    }

    const add = () =>
    {
        if(!editProduct.id)
        {
            setCanAdd(true);
        }
        
    }

    const getAllUsers = async() =>
    {
        setUserList( await allUsers(adminInfo.isAdministrator));
    }

    const remove = async(pId) =>
    {   
        const removedProduct = await removeProduct(pId, adminInfo.isAdministrator);
        setProductChange(true);
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
                <button className="add-btn" onClick={add}>Add Product</button>
                {
                   <div id="productsList">
                    {
                    products.map((product) =>
                    {
                        return <div key={product.id} className="productInfo">
                                <ul>
                                    <h3>{product.name}</h3>
                                    <div id="product-btn-div">
                                        <button className="product-btn" id="pen-btn" onClick={() =>{canEdit(product)}}><GiQuill /></button>
                                        <button className="product-btn" id="x-btn" onClick={() =>{remove(product.id)}}>X</button>
                                    </div>
                                    <ul>
                                        <li>Description: {product.description}</li>
                                        <li>Price: {product.price} copper coins</li>
                                        <li>Stock: {product.stock}</li>
                                        <li>Rarity: {product.rarity}</li>
                                        <li>Category: {product.category}</li>
                                        <li>image URL: {product.imageURL}</li>
                                    </ul>
                                </ul>
                            </div>
                    })
                }</div>
                }
            
         </div>: null
        }
        <div id="updateForms">{editProduct.id && canAdd===false ? <UpdateForm categoryList={categoryList} productInfo={editProduct} isAdmin={adminInfo.isAdministrator} setEditProduct={setEditProduct} setProductChange={setProductChange}/>:null}
        {canAdd ? <AddProduct categoryList={categoryList} isAdmin={adminInfo.isAdministrator} setCanAdd={setCanAdd} canAdd={canAdd} setProductChange={setProductChange}/>:null}
        </div>
        {
            userList ? 
            <div className="users-div">
                <h2>Users</h2>
                <div id="userList">
                    {
                        userList.map((user) =>
                        {
                            return<div key={user.id}>
                                <ul>
                                    <h3>Username: {user.username}</h3>
                                    <li>Email: {user.email}</li>
                                    {user.isAdministrator ?<li>Admin Status: True</li>:<li>Admin Status: False</li>}
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