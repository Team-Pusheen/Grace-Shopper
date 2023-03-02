export const getProducts = (async() =>{
    
   return fetch('/api/products',{
        method: 'GET'
    }).then(response => response.json())
    .then(result =>{
        return result;
    })
})