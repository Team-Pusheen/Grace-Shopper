import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Products from './Products';
import Register from './Register';
import Cart from './Cart';
import {getProducts} from "../fetchFunctions"
import SingleView from "./SingleView"
import Footer from "./Footer"
import { Link, NavLink, Routes, Route } from 'react-router-dom';
import { GiSwordman, GiOpenChest, GiLockedChest } from 'react-icons/gi'



const App = ()=> {
  const [auth, setAuth] = useState({});
  const [products, setProducts] =useState([]);
  const [cart, setCart] = useState([]);

  const attemptLogin = ()=> {
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
      .then( user => {setAuth(user)
        console.log(user);
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

    const getCart =async() =>
    {
      console.log(auth);
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
      <nav>
        <div className="logo-div"><p><GiSwordman className='logo' /> Pusheen Bazaar</p></div>
        <div className="top-container">
        <div className="logo-div">        
        <NavLink to='/'>Home</NavLink>
        <NavLink to ='/products'>Products</NavLink>
        
        </div>
      {
          auth.id ? (
            <>
              <button className='login-btn' onClick={ logout }>Logout { auth.username }</button>
            </>
          ) : (
            <div className='login-register'>
              <Link to='/login'><button className='login-btn'>Login</button></Link>
              <Link to ='/register'><button className='login-btn'>Sign Up</button></Link>
              <NavLink to ='/cart'>Cart <GiLockedChest className='chest-closed' /></NavLink>
            </div>
          )
        }
        </div>
      </nav>
        <div className='body-container'>
       
    
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

        <Route path= '/products/:productsId' element={<SingleView products={products}/>}/>
        <Route path = '/cart' element={<Cart cart={cart}/>} />

      </Routes> 
      </div>
      <Footer />
    </div>
  );
};

export default App;
