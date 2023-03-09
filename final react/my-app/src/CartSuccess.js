import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const CartSuccess = ({ setCart }) => {
  useEffect(() => {
    setCart([]);
  }, [setCart]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Your order has been placed!
        </Typography>
        <Typography color="textSecondary">
          Thank you for shopping with us!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartSuccess;
