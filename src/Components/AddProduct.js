import React, {useState} from "react";
import { addProductToStock } from "../fetchFunctions";

const AddProduct =({isAdmin, setCanAdd, canAdd}) =>
{
    const [name, setName] = useState(""); 
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [Rarity, setRarity] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const goAdd = async(ev) =>
    {
        ev.preventDefault();
        if(name && desc && price && stock && Rarity && category)
        {
            const newProduct = await addProductToStock(isAdmin, name, desc, price, stock, Rarity, image, category);
            setCanAdd(false);
        }
        
    }

    if(canAdd ===false)
    {
        return null;
    }

    return<div>
    <h2>Create New Product</h2>
    <form onSubmit={goAdd}>
        <>
        <label>Name:</label>
        <input placeholder="product name" value={name} onChange={ev =>{setName(ev.target.value)}}></input>
        </>
        <>
        <label>Description:</label>
        <textarea placeholder="description" value={desc} onChange={ev =>{setDesc(ev.target.value)}}></textarea>
        </>
        <>
        <label>Price:</label>
        <input placeholder="price in copper coins" value={price} type="number" onChange={ev =>{setPrice(ev.target.value)}}></input>
        </>
        <>
        <label>Stock:</label>
        <input placeholder="stock count" type="number" value={stock} onChange={ev =>{setStock(ev.target.value)}}></input>
        </>
        <>
        <label>Rarity:</label>
        <input placeholder="rarity" type="number" value={Rarity} onChange={ev =>{setRarity(ev.target.value)}}></input>
        </>
        <>
        <label>Category:</label>
        <input placeholder="category" value={category} onChange={ev =>{setCategory(ev.target.value)}}></input>
        </>
        <>
        <label>Image Link:</label>
        <input placeholder="image link" value={image} onChange={ev =>{setImage(ev.target.value)}}></input>
        </>
        <button>Save</button>
    </form>
    <button onClick={ev =>setCanAdd(false)}>Cancel</button>
</div>


}

export default AddProduct;