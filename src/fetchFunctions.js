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
            //console.log(result);
            return result;
        })
    }
    else{
        return [];
    }
    
})