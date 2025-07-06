import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import OrderItemBody from "./OrderItemBody";
import OrderItemImage from "./OrderItemImage";
import { showFormattedDate } from "../../utils/data_order";

function OrderItem({ order, onDelete, onEdit, onUpdate, onRemove }) {
  const { id, customer_name, createdAt, products, edited} = order;

  const totalOrderPrice = products.reduce(
    (total, product) => total + product.product_price * product.quantity, 0
  );

  return (
    <div className="order-item">
      <div className="order-item-content">
        <h3>{customer_name}</h3>
        <p className="order-item-date">{showFormattedDate(createdAt)}</p>

        {products.map((product, index) => (
          <div key={index} className="order-item-product_name" >
            <OrderItemImage imageUrl={product.product_thumbnail} />
            <OrderItemBody
              product_name={product.product_name}
              quantity={product.quantity}
              product_price={product.product_price}
            />
          </div>
        ))}

        <div className="order-item-total" >
          Grand Total: Rp{totalOrderPrice.toLocaleString()}
        </div>
      </div>

      <div className="order-item-action">
        <EditButton id={id} onEdit={onEdit} />
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default OrderItem;
