import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Update order status and save back to localStorage
  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ color: "#ff6600", marginBottom: "20px" }}>Admin – Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#fff8f0",
            }}
          >
            <h3 style={{ margin: "0 0 5px 0" }}>
              Order #{order.id} — {order.status}
            </h3>
            <p style={{ margin: "0 0 5px 0" }}>
              <strong>Name:</strong> {order.name} <br />
              <strong>Phone:</strong> {order.phone} <br />
              <strong>Address:</strong> {order.address}
            </p>
            <p style={{ margin: "0 0 10px 0" }}>
              <strong>Payment Method:</strong> {order.paymentMethod} <br />
              <strong>Total:</strong> Ksh {order.total}
            </p>

            <div style={{ marginBottom: "10px" }}>
              <strong>Items:</strong>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.qty} x {item.name} @ Ksh {item.price} = Ksh{" "}
                    {item.qty * item.price}
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <strong>Placed At:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* Status selector */}
            <select
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              <option>pending</option>
              <option>preparing</option>
              <option>completed</option>
              <option>cancelled</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}
