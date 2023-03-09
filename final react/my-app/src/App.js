import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Home from './views/Home';
import Signup from './views/Signup';
import Login from './views/Login';
import Cart from './views/Cart';
import Bio from './views/Bio';
import CartSuccess from './CartSuccess';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

export default function App() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);

    const showMessages = () => {
        const handleClose = () => {
            setMessages([]);
        };

        if (messages.length > 0) {
            return (
                <div className="popup">
                    <span className="close" onClick={handleClose}>
                        &times;
                    </span>
                    {messages.map((m, i) => (
                        <p key={i}>{m}</p>
                    ))}
                </div>
            );
        }
    };


    const cartTotal = () => {
        let total = 0;
        for (let item of cart) {
            total += parseFloat(item.price)
        }
        return total.toFixed(2)
    };

    const logMeIn = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };
    
    const logMeOut = () => {
        localStorage.removeItem('user');
        setUser({});
    };
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        console.log('Stored user:', storedUser);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

    const addProduct = (product, size) => {
        product.size = size;
        const copy = ([...cart, product]);
        setCart(copy)
    };

    const removeProduct = (item) => {
        const updatedCart = [...cart];
        const index = updatedCart.findIndex(cartItem => cartItem.id === item.id && cartItem.size === item.size);
        if (index >= 0) {
            updatedCart.splice(index, 1);
            setCart(updatedCart);
        }
    };

    const getCartAPI = async (user) => {
        if (user.apitoken) {
            const url = 'http://127.0.0.1:5000/api/cart/get';
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.apitoken}`
                }
            }

            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok') {
                setCart(data.cart)
            }

        } else {
            setCart([])
        }
    };

    useEffect(() => {
        getCartAPI(user)
    }, [user])

    
    return (
        <BrowserRouter>
            <div>
                <Nav user={user} logMeOut={logMeOut} cart={cart} cartTotal={cartTotal} />
                {showMessages()}
                <Routes>
                    <Route path='/Login' element={<Login logMeIn={logMeIn} />} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/' element={ <Home addProduct={addProduct} user={user} setMessages={setMessages} /> } />
                    <Route path='/Cart' element={ <Cart cart={cart} removeProduct={removeProduct} user={user} setMessages={setMessages} /> } />
                    <Route path='/Bio' element={< Bio /> } />
                    <Route path="/CartSuccess" element={<CartSuccess setCart={setCart}/>} />
                </Routes>
                <footer>
                    <p>&copy; Levi,s Crew . All Rights Reserved.</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}