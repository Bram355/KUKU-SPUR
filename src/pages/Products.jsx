import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Products({ cart, setCart }) {
  const navigate = useNavigate();

  // Add product to cart
  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #fff9f2, #fff4e6)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
          padding: "15px",
          background: "#ffedd5",
          borderRadius: "15px",
        }}
      >
        <h1 style={{ fontSize: "28px", color: "#ff6600", marginBottom: "10px" }}>
          KUKU SPUR - Fresh Chicken Delivered
        </h1>
        <p style={{ fontSize: "16px", color: "#8b5e3c" }}>
          Select your favorite chicken parts and order now: +254710555861
        </p>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "15px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              transition: "transform 0.2s, box-shadow 0.2s",
              borderRadius: "15px",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <ProductCard product={product} onAdd={() => addToCart(product)} />
          </div>
        ))}
      </div>

      {/* Sticky Cart Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => navigate("/cart")}
          style={{
            backgroundColor: "#ff6600",
            color: "#fff",
            border: "none",
            padding: "14px 30px",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          View Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
        </button>
      </div>
    </div>
  );
}
