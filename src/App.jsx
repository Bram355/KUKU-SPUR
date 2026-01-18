import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminOrders from "./admin/AdminOrders";

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        {/* ✅ added setOrders */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
              setOrders={setOrders}
            />
          }
        />

        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* ✅ added orders + setOrders */}
        <Route
          path="/admin"
          element={
            <AdminOrders
              orders={orders}
              setOrders={setOrders}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
