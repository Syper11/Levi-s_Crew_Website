import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import CarouselSlider from '../components/CarouselSlider';

const Home = ({ addProduct, user, setMessages }) => {
  const [products, setProducts] = useState([]);

  const getItems = async () => {
    const url = (`http://localhost:5000/api/all_products`);
    const res = await fetch(url);
        const data = await res.json();
        if (data.status === 'ok') {
            setProducts(data.products)
        }
    };

  const showItems = () => {
    return products.map((product) => (
      <Product
        id={product.id}
        product={product}
        addProduct={addProduct}
        user={user}
        key={`${product.id}`-`${product.product_name}`}
        setMessages = {setMessages}
      />
    ));
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <CarouselSlider/>
      {showItems()}
    </div>
  )
};

export default Home;