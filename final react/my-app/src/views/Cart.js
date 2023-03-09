import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const ShopItem = ({ cart, removeProduct, user, setMessages }) => {


  const getUniqueCart = (cart) => {
    const uniqueCart = [];
    const idsAndSizes = new Set();

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const idAndSize = `${item.id}-${item.size}`;

      if (!idsAndSizes.has(idAndSize)) {
        uniqueCart.push(item);
        idsAndSizes.add(idAndSize);
      }
    }

    return uniqueCart;
  };


  const getQuantity = (searchItem, cart) => {
    let count = 0;

    for (let item of cart) {
      if (item.id === searchItem.id && item.size === searchItem.size) {
        count++;
      }
    }

    return count;
  };

  const removeFromCartAPI = async (item) => {
    const url = 'http://127.0.0.1:5000/api/cart/remove';
    const options = {
      method: 'POST',
      body: JSON.stringify({ 'productId': item.id, 'size': item.size }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.apitoken}`
      }
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok') {
      console.log(data)
      setMessages([data.message])
    }
  };

  const handleClick = (item) => {
    removeProduct(item);
    if (user.apitoken) {
      removeFromCartAPI(item)
      
    }
  };

  const addInputTag = () => {
    return getUniqueCart(cart).map(item => 
      <input hidden name={`${item.product_name} size ${item.size} __${item.price}`} defaultValue={getQuantity(item, cart)} />
      
    )
  };

  return cart.length === 0 ? (
    <>
      <table className='table' style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th scope='col'>Item</th>
            <th scope='col'>Name</th>
            <th scope='col'>Size</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Price</th>
            <th scope='col'>Subtotal</th>
            <th scope='col'>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="7">
              <h2>You Have No Items</h2>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  ) : (
      <>
        <table className='table' style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th scope='col'>Item</th>
              <th scope='col'>Name</th>
              <th scope='col'>Size</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Subtotal</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {getUniqueCart(cart).map(item => (
              <tr key={`${item.id}-${item.size}`}>
                <td><img src={item.img_url} alt='' style={{ width: '50px' }} /></td>
                <td>{item.product_name}</td>
                <td>{item.size}</td>
                <td>{getQuantity(item, cart)}</td>
                <td>${item.price}</td>
                <td>${(item.price * getQuantity(item, cart)).toFixed(2)}</td>
                <td><button className='btn btn-danger' onClick={() => { handleClick(item) }}><DeleteIcon /></button></td>

              </tr>
            ))}
          </tbody>
        </table>
        <form method="POST" action="http://127.0.0.1:5000/create-checkout-session">
          {addInputTag()}
          <button type='submit' className="btn btn-success">CHECKOUT</button>
        </form>
      </>
    );
};

export default ShopItem;