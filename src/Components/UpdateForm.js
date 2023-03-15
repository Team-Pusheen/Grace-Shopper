import React, {useState} from "react";
import {updateProduct} from "../fetchFunctions"

const UpdateForm =({categoryList, productInfo, setEditProduct, isAdmin, setProductChange}) =>
{ 
    const [name, setName] = useState(productInfo.name); 
    const [desc, setDesc] = useState(productInfo.description);
    const [price, setPrice] = useState(productInfo.price);
    const [stock, setStock] = useState(productInfo.stock);
    const [Rarity, setRarity] = useState(productInfo.rarity);
    const [category, setCategory] = useState(productInfo.category);
    const [image, setImage] = useState(productInfo.imageURL);
    const [newCategory, setNewCategory] = useState("");

    const goUpdate = async(ev) =>
    {
        console.log(category);
        ev.preventDefault();
        if(newCategory)
        {
            await updateProduct(isAdmin, productInfo.id, name, desc, price, stock, Rarity, image, newCategory);

        }
        else{
            await updateProduct(isAdmin, productInfo.id, name, desc, price, stock, Rarity, image, category);
        }
        setEditProduct({});
        setProductChange(true);
        
    }
    
    if(!categoryList.includes("Other"))
    {
        categoryList.push("Other");
    }

    if(!productInfo.id)
    {
        return null;
    }

    return <div>
        <h2>Update Item</h2>
        <form onSubmit={goUpdate}>
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
            <input placeholder="price in copper coins" type="number" value={price} onChange={ev =>{setPrice(ev.target.value)}}></input>
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
            <label htmlFor="category-names">Category:</label>
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
            <button>Save</button>
        </form>
        <button onClick={ev =>setEditProduct({})}>Cancel</button>
    </div>
}

export default UpdateForm;