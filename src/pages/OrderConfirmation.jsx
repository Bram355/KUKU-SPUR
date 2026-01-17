import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from location state
  const { name, cart, total } = location.state || {};

  useEffect(() => {
    // If no order data, redirect home
    if (!name || !cart) {
      navigate("/");
    }
  }, [name, cart, navigate]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#fff8f0",
      }}
    >
      <h1 style={{ color: "#ff6600", marginBottom: "20px" }}>
        Thank you, {name}!
      </h1>

      <h2 style={{ color: "#ff6600", marginBottom: "10px" }}>Your Order</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "10px",
            background: "#fff3e0",
          }}
        >
          <div>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ margin: 0 }}>
              {item.qty} x Ksh {item.price}
            </p>
          </div>
          <p style={{ fontWeight: "bold" }}>Ksh {item.price * item.qty}</p>
        </div>
      ))}

      <div
        style={{
          marginTop: "15px",
          padding: "15px",
          borderTop: "2px solid #ff6600",
          textAlign: "right",
          backgroundColor: "#fff7f0",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#ff6600" }}>Total: Ksh {total}</h2>
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            flex: 1,
            backgroundColor: "#ff6600",
            color: "#fff",
            border: "none",
            padding: "14px 20px",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#e05500";
            e.target.style.transform = "scale(1.03)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#ff6600";
            e.target.style.transform = "scale(1)";
          }}
        >
          Back to Home
        </button>

        <button
          onClick={() => navigate("/orders")}
          style={{
            flex: 1,
            backgroundColor: "#ffa500",
            color: "#fff",
            border: "none",
            padding: "14px 20px",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#e69500";
            e.target.style.transform = "scale(1.03)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#ffa500";
            e.target.style.transform = "scale(1)";
          }}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}
