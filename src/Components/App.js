import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Products from './Products';
import Register from './Register';
import Cart from './Cart';
import {getProducts, grabUserCart, getMeByToken} from "../fetchFunctions"
import SingleView from "./SingleView"
import { Link, Routes, Route } from 'react-router-dom';



const App = ()=> {
  const [auth, setAuth] = useState({});
  const [products, setProducts] =useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  const attemptLogin = async()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      fetch(
        '/api/auth/',
        {
          method: 'GET',
          headers: {
            'authorization': token 
          }
        }
      )
      .then( response => response.json())
      .then( user => {
        setAuth(user)
      });
    }
  };

  useEffect(()=> {
    attemptLogin();
    const grabProducts = async() =>
    {
      const allProducts = await getProducts()
      setProducts(allProducts);
    }
    grabProducts();

    const getMe = async() =>
    {
      const userInfo = await getMeByToken();
      setUser(userInfo);
      console.log(user);

    }
    getMe();

    const getCart =async() =>
    {
      const userCart = await grabUserCart(user.id);
      setCart(userCart);
    }
    
    getCart();
    
    
  }, []);

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  const login = async({ username, password})=> {
    fetch(
      '/api/auth/',
      {
        method: 'POST',
        body: JSON.stringify({ username, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then( response => response.json())
    .then( (data) => {
      if(data.token){
        window.localStorage.setItem('token', data.token);
        attemptLogin();
      }
      else {
        console.log(data);
      }
    });
  };

  return (
    <div>
      <h1>Pusheen Bazaar</h1>
      <nav>
        {
          auth.id ? (
            <>
              <Link to='/'>Home</Link>
              <button onClick={ logout }>Logout { auth.username }</button>
            </>
          ) : (
            <>
            <>
              <Link to='/login'>Login</Link>
            </>
            <>
              <Link to ='/register'>Sign Up</Link>
            </>
            </>
          )
        }
        <Link to ='/products'>Products</Link>
        <Link to ='/cart'>Cart({auth.id ? cart.length: null})</Link>
      </nav>
      <Routes>
        {
          auth.id ? (
            <>
            <Route path='/' element= { <Home auth={ auth }/> } />
            </>

          ): (
            <>
              <>
              <Route path='/login' element= { <Login login={ login }/> } />
              </>
              <>
              <Route path='/register' element ={<Register />}/>
              </>
            </>
          )
        }
        <Route path= '/products' element={<Products products={products}/> }/>
        <Route path= '/products/:productsId' element={<SingleView/>}/>
        <Route path = '/cart' element={<Cart cart={cart} products={products}/>} />
      </Routes>
    </div>
  );
};

export default App;
