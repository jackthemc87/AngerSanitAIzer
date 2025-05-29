<button
  onClick={handleSanitize}
  disabled={loading}
  style={{
    padding: "0.75rem 1.5rem",
    fontWeight: "bold",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  }}
>
  {loading ? "SanitAIzing..." : "SanitAIze It"}
</button>
