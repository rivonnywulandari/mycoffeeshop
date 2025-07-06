import React from 'react';
import { createRoot } from 'react-dom/client';
import OrderApp from './components/order/OrderApp';
import './styles/style.css';


const root = createRoot(document.getElementById('root'));
root.render(<OrderApp />);


