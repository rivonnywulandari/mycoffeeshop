import React from 'react';
 
function EditButton({ id, onEdit }) {
  return <button className='order-item-edit' onClick={() => onEdit(id)}>Edit</button>
}
 
export default EditButton;