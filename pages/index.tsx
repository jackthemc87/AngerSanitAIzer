import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [sanitized, setSanitized] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSanitize = async () => {
    setLoading(true);
    setSanitized("");

    const res = await fetch("/api/sanitize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    setSanitized(data.sanitized || "Error processing.");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>The Anger SanitAIzer</h1>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Say the things you really want to say without the repercussions.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste your angry message here..."
        style={{ width: "100%", padding: "1rem", marginBottom: "1rem", fontSize: "1rem" }}
      />

      <button
        onClick={handleSanitize}
        disabled={loading}
        style={{ padding: "0.75rem 1.5rem", fontWeight: "bold", backgroundColor: "#000", color: "#fff", border: "none" }}
      >
        {loading ? "Sanitizing..." : "SanitAIze It"}
      </button>

      {sanitized && (
        <div style={{ marginTop: "2rem", backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Sanitized Version:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{sanitized}</pre>
        </div>
      )}

      <footer style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        The Anger SanitAIzer was created by Jack McNamara, a freelance advertising creative.{" "}
        <a href="https://jack-mcnamara.com" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
          See his book
        </a>
      </footer>
    </div>
  );
}
