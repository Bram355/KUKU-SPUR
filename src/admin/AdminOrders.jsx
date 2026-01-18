import { useEffect, useState } from "react";
import { db, ordersCollection, getDocs, doc, updateDoc, deleteDoc } from "../firebase";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Load orders from Firestore on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(ordersCollection);
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Update order status and optionally delete if completed or cancelled
  const updateStatus = async (id, newStatus) => {
    try {
      const orderDoc = doc(db, "orders", id);

      if (["completed", "cancelled"].includes(newStatus.toLowerCase())) {
        // Remove order from Firestore
        await deleteDoc(orderDoc);
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } else {
        // Update status in Firestore
        await updateDoc(orderDoc, { status: newStatus });
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Function to contact customer via WhatsApp
  const contactWhatsApp = (order) => {
    const message = `Hello ${order.name}, regarding your order #${order.id}:

Items:
${order.items.map((item) => `${item.qty} x ${item.name} = Ksh ${item.qty * item.price}`).join("\n")}

Total: Ksh ${order.total}`;

    const whatsappURL = `https://wa.me/${order.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
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
                marginRight: "10px",
              }}
            >
              <option>pending</option>
              <option>preparing</option>
              <option>completed</option>
              <option>cancelled</option>
            </select>

            {/* WhatsApp button */}
            <button
              onClick={() => contactWhatsApp(order)}
              style={{
                padding: "8px 15px",
                backgroundColor: "#25D366",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              WhatsApp Customer
            </button>
          </div>
        ))
      )}
    </div>
  );
}
