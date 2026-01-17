import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
