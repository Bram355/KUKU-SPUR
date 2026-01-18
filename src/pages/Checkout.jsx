import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  // Customer info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function placeOrder() {
    if (!name || !phone || !address) {
      alert("Please fill all your details!");
      return;
    }

    // Build order object
    const order = {
      id: Date.now(), // unique order ID
      name,
      phone,
      address,
      paymentMethod,
      items: cart,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Get existing orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add new order
    orders.push(order);

    // Save back to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Build order summary string
    const orderDetails = cart
      .map(
        (item) =>
          `${item.qty} x ${item.name} @ Ksh ${item.price} = Ksh ${
            item.price * item.qty
          }`
      )
      .join("\n");

    // Show alert
    alert(
      `Order placed successfully!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment: ${paymentMethod}\n\nOrder Summary:\n${orderDetails}\n\nTotal: Ksh ${total}`
    );

    // Open WhatsApp with pre-filled message
    const whatsappMessage = `Hello, I would like to place an order:

Name: ${name}
Phone: ${phone}
Address: ${address}
Payment: ${paymentMethod}
Order Total: Ksh ${total}

Order Details:
${orderDetails}`;

    const whatsappNumber = "254701234567"; // <-- Replace with your WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappURL, "_blank");

    // Clear cart and navigate home
    setCart([]);
    navigate("/");
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#fff8f0",
      }}
    >
      <h1 style={{ color: "#ff6600", marginBottom: "20px" }}>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Cart Summary */}
          <h2 style={{ color: "#ff6600", marginBottom: "10px" }}>Order Summary</h2>
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

          {/* Customer Info */}
          <h2 style={{ color: "#ff6600", marginTop: "30px" }}>Your Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />

          {/* Payment Method */}
          <h2 style={{ color: "#ff6600", marginTop: "20px" }}>Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option>Cash on Delivery</option>
          </select>

          {/* Place Order Button */}
          <button
            onClick={placeOrder}
            style={{
              marginTop: "10px",
              backgroundColor: "#ff6600",
              color: "#fff",
              border: "none",
              padding: "14px 30px",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              width: "100%",
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
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
