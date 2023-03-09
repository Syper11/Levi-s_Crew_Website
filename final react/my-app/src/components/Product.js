import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import SizeSelect from './SizeSelect';

export default function Product({ product, addProduct, user, setMessages }) {
  const [selectedSize, setSelectedSize] = useState('');

  const addToCartAPI = async () => {
  if (user.apitoken) {
    const url = `http://localhost:5000/api/cart/add`;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        productId: product.id,
        selectedSize: selectedSize || '',
      }),
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${user.apitoken}`,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok') {
      console.log(data);
      setMessages([data.message]);
      

    }
  }
};

  return (
    <Card
      sx={{
        maxWidth: 345,
        marginLeft: "20px",
        
        }
      }
    >
      <CardMedia component="img" height="100%" image={product.img_url} alt="Product Image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.5rem' }}>
          ${product.price}
        </Typography>
        <SizeSelect size={selectedSize} setSize={setSelectedSize} />
        <Button variant="contained" onClick={() => { addProduct(product, selectedSize); addToCartAPI(); }}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}