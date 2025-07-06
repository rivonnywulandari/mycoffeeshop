import React from 'react';
import OrderItem from './OrderItem';
 
function OrderList({ orders, onDelete, onEdit, onUpdate, onRemove }) {
  if (orders.length === 0) {
    return <p className="order-list-empty-message">Tidak ada pesanan</p>;
  }

  return (
   <div className="order-list">
     {
       orders.map((order) => (
         <OrderItem 
         key={order.id} 
         order={order} 
         onDelete={onDelete} 
         onEdit={onEdit} 
         {...order} />
       ))
     }
   </div>
 );
}
 
export default OrderList;