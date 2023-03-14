import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Products from './Products';
import Register from './Register';
import Cart from './Cart';
import {getProducts, grabUserCart, getCategoriesList} from "../fetchFunctions"
import SingleView from "./SingleView"
import Footer from "./Footer"
import Admin from './Admin';
import { Link, NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { GiSwordman, GiOpenChest, GiLockedChest } from 'react-icons/gi'




const App = ()=> {
  const [auth, setAuth] = useState({});
  const [products, setProducts] =useState([]);
  const [cart, setCart] = useState([]);
  const [productChange, setProductChange] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();


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
      setProductChange(false);
    }
    grabProducts();
       

  }, [productChange]);

  useEffect(() =>
  {    
    const getCart =async() =>
      {
        
        const userCart = await grabUserCart(auth.id);
        setCart(userCart);
      }
    
    if(auth.id)
    {
      getCart();
    }
  },[auth])

useEffect(() =>{
  const grabCategories = async() =>
  {
    const cList = await getCategoriesList();
    setCategoryList(cList);
  }
  grabCategories();
},[])

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});

    // redirect to login page
   navigate('/login')

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


    <div className='wrap'>  

    <div>
      <nav>
        <Link to='/'><div className="logo-div"><p><GiSwordman className='logo' /> Pusheen Bazaar</p></div></Link>
        <div className="top-container">
        <div className="logo-div">        
        <NavLink to='/'>Home</NavLink>
        <NavLink to ='/products'>Products</NavLink>
        {auth.isAdministrator ? <Link to='/admin'>Admin</Link>: null}
        </div>
      {
          auth.id ? (
            <div className='login-register'>
              <button className='login-btn' onClick={ logout }>Logout { auth.username }</button>
              <NavLink to ='/cart'>Cart({auth.id ? cart.length: null}) <GiLockedChest className='chest-closed' /></NavLink>
            </div>
          ) : (
            <div className='login-register'>
              <Link to='/login'><button className='login-btn'>Login</button></Link>
              <Link to ='/register'><button className='login-btn'>Sign Up</button></Link>
              <NavLink to ='/cart'>Cart({auth.id ? cart.length: null}) <GiLockedChest className='chest-closed' /></NavLink>
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
        <Route path='/' element= { <Home auth={ auth }/> } />
        <Route path= '/products' element={<Products products={products} categoryList={categoryList}/> }/>
        <Route path= '/products/:productsId' element={<SingleView products={products} cartId={auth.cartId} setCart={setCart} cart={cart} userId={auth.id} />}/>

      <Route path = '/cart' element={<Cart cart={cart} setCart={setCart} id={auth.id}/>} />
      {auth.isAdministrator ? <Route path ='/admin' element ={<Admin categoryList={categoryList} products={products} adminInfo={auth} setProductChange={setProductChange}/>}/>:null}
      </Routes> 
      </div>
      <Footer />
    </div>
  );
};

export default App;
