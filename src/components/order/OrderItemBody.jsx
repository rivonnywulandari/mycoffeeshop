import React from 'react';

function OrderItemBody({ product_name, quantity, product_price }) {
  const totalPrice = product_price * quantity;

  return (
    <div className="order-item-body">
      <h4 className="order-item-product_name">{product_name}</h4>
      <p className="order-item-product_info">Qty: {quantity}</p>
      <p className="order-item-product_info">Price: Rp{product_price.toLocaleString()}</p>
      <p className="order-item-product_info">Total: Rp{totalPrice.toLocaleString()}</p>
    </div>
  );
}

export default OrderItemBody;
