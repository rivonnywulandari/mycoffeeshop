import React from "react";

function OrderItemImage({ imageUrl }) {
  return (
    <div className="order-item-image">
      <img src={imageUrl} alt="product" />
    </div>
  );
}

export default OrderItemImage;
