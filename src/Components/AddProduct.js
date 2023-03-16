import React, {useState} from "react";
import { addProductToStock } from "../fetchFunctions";

const AddProduct =({categoryList, isAdmin, setCanAdd, canAdd, setProductChange}) =>
{
    const [name, setName] = useState(""); 
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [Rarity, setRarity] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const goAdd = async(ev) =>
    {
        ev.preventDefault();
        if(name && desc && price && stock && Rarity && category && category !== "----")
        {
            await addProductToStock(isAdmin, name, desc, price, stock, Rarity, image, category);
            setCanAdd(false);
            setProductChange(true);
        }
        else if(name && desc && price && stock && Rarity && newCategory)
        {
            await addProductToStock(isAdmin, name, desc, price, stock, Rarity, image, newCategory);
            setCanAdd(false);
            setProductChange(true);
        }
        
    }

    if(canAdd ===false)
    {
        return null;
    }

    if(!categoryList.includes("----") && !categoryList.includes("other"))
    {
        categoryList.unshift("----");
        categoryList.push("Other");
    }

    return<div id="form-container">
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
        <select value={category} onChange={ev =>{setCategory(ev.target.value)}} name="category-names">
                {
                    categoryList.map((category, idx) =>{
                        return <option key={idx} value={category}>{category}</option>
                    })
                }
            </select>
            {category === "Other" ? <input placeholder="new Category" value={newCategory} onChange={ev =>{setNewCategory(ev.target.value)}}></input>:null}
        </>
        <>
        <label>Image Link:</label>
        <input placeholder="image link" value={image} onChange={ev =>{setImage(ev.target.value)}}></input>
        </>
        <button id="save-btn">Save</button>
    </form>
    <button id="cancel-btn" onClick={ev =>setCanAdd(false)}>Cancel</button>
</div>


}

export default AddProduct;