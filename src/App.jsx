import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderApp from './components/order/OrderApp';

function App() {
  return (
    <Router basename="/mycoffeeshop">
      <Routes>
        <Route path="/" element={<OrderApp />} />
      </Routes>
    </Router>
  );
}

export default App;
