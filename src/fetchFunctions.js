export const getProducts = (async() =>{
    
   return fetch('/api/products',{
        method: 'GET'
    }).then(response => response.json())
    .then(result =>{
        return result;
    })
})

export const register = (async(username, password, name, email) =>
{ 
    return fetch('api/users/register', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username:`${username}`,
            password:`${password}`,
            name:`${name}`,
            email:`${email}`,
            isAdministrator: false
        })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
})

export const grabUserCart = (async(userId) =>
{ 
    const token = window.localStorage.getItem('token');
    if(token)
    {
        return fetch(`api/users/${userId}/cart`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(responce => responce.json())
        .then(result => {
            return result;
        })
    }
    else{
        return [];
    }
})
    export const deleteFromCart = async(cartId, productsId) =>
{   
    const token = window.localStorage.getItem('token');

    if(token)
    {
        return fetch(`api/cartProducts/${cartId}/${productsId}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(responce => responce.json())
        .then(result => {
            return result;
        })
    }else{
        //this is for a guest user.
    }
    
}

export const  dumpCart = async(cartId) =>
{
    const token = window.localStorage.getItem('token');

    if(token)
    {
        return fetch(`api/cartProducts/${cartId}`,
        {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(responce => responce.json())
        .then(result => {
                return result;
            })
    }
    else{
        //this is for a guest user.
    }
}

export const reduceStock = async(productsId, stock) =>
{
    return fetch(`api/products/purchase/${productsId}`,
    {
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock:`${stock}`,
        })
    }).then(responce => responce.json())
    .then(result => {
        return result;
    })
}


export const cartAmountUpdate = async(cartId, productsId, quantity) =>
{
    const token = window.localStorage.getItem('token');

    return fetch(`api/cartProducts/${cartId}/${productsId}`,
    {
        method: "PATCH",
        headers:{
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            quantity:`${quantity}`
        })
    }).then(responce => responce.json())
    .then(result =>{
        return result;
    })
    
}

export const toCart = (async(cartId, productsId, quantity) =>
{
    return fetch(`api/cartProducts/${cartId}/${productsId}`, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
        },
        body: JSON.stringify({
            quantity:`${quantity}`
        })
    }).then(response => response.json())
    .then(result =>{ console.log(result)
        return result;
    })

})


