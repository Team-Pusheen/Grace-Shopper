export const getProducts = (async() =>{
    
   return fetch('/api/products',{
        method: 'GET'
    }).then(response => response.json())
    .then(result =>{
        return result;
    })
})

export const register= (async() =>
{
    return fetch('api/users/register', {
        method: "POST",
    })
})