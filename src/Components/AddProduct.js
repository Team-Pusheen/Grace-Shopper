import React, {useState} from "react";

const AddProduct =({isAdmin}) =>
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

    }

    return<div>
    <h2>Update Item</h2>
    <form onSubmit={goAdd}>
        <>
        <label>Name:</label>
        <input placeholder="product name" value={name} onChange={ev =>{setName(ev.target.value)}}></input>
        </>
        <>
        <label>Description:</label>
        <input placeholder="description" value={desc} onChange={ev =>{setDesc(ev.target.value)}}></input>
        </>
        <>
        <label>Price:</label>
        <input placeholder="price in copper coins" value={price} onChange={ev =>{setPrice(ev.target.value)}}></input>
        </>
        <>
        <label>Stock:</label>
        <input placeholder="stock count" value={stock} onChange={ev =>{setStock(ev.target.value)}}></input>
        </>
        <>
        <label>Rarity:</label>
        <input placeholder="rarity" value={Rarity} onChange={ev =>{setRarity(ev.target.value)}}></input>
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
    <button onClick={ev =>setEditProduct({})}>Cancel</button>
</div>


}

export default AddProduct;