export default function ProductCard({ product, onAdd }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <h2 style={{ margin: "10px 0" }}>{product.name}</h2>
      <p style={{ margin: "5px 0", fontWeight: "bold" }}>Ksh {product.price}</p>
      <button
        onClick={onAdd}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
