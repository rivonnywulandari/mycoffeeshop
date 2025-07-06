import React from 'react';
 
function DeleteButton({ id, onDelete }) {
  return <button className='order-item-delete' onClick={() => onDelete(id)}>Delete</button>
}
 
export default DeleteButton;