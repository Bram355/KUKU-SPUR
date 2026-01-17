import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  // Remove an item from the cart
  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#fff8f0",
      }}
    >
      <h1 style={{ color: "#ff6600", marginBottom: "20px" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "10px",
                background: "#fff3e0",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: 0 }}>
                  {item.qty} x Ksh {item.price}
                </p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>Ksh {item.price * item.qty}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: "#ff4d00",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginTop: "5px",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderTop: "2px solid #ff6600",
              textAlign: "right",
            }}
          >
            <h2>Total: Ksh {total}</h2>
          </div>

          <button
            onClick={() => alert("Checkout coming soon!")}
            style={{
              marginTop: "20px",
              backgroundColor: "#ff6600",
              color: "#fff",
              border: "none",
              padding: "14px 30px",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Checkout
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "10px",
              backgroundColor: "#fff",
              color: "#ff6600",
              border: "2px solid #ff6600",
              padding: "14px 30px",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
