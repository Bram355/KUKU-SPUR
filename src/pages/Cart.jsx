import React from "react";

export default function Cart({ cart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} x {item.qty} - ${item.price * item.qty}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
