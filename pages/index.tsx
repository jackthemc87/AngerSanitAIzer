import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [input, setInput] = useState("");
  const [sanitized, setSanitized] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSanitize = async () => {
    setLoading(true);
    setSanitized("");
    setError("");

    try {
      const res = await fetch("/api/sanitize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setSanitized(data.sanitized);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to reach the server.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <Head>
        <title>The Anger SanitAIzer (Beta)</title>
        <meta name="description" content="Turn your angry work emails into HR-safe replies with AI." />

        {/* Open Graph / LinkedIn Preview */}
        <meta property="og:title" content="The Anger SanitAIzer" />
        <meta property="og:description" content="Paste your angry message. Get a professional response back. It's like a PR firm for your rage." />
        <meta property="og:image" content="https://i.ibb.co/fznrRVN6/Correct-Size.png" />
        <meta property="og:url" content="https://angersanitaizer.xyz" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Anger SanitAIzer" />
        <meta name="twitter:description" content="Paste your angry message. Get a professional response back. It's like a PR firm for your rage." />
        <meta name="twitter:image" content="https://i.ibb.co/fznrRVN6/Correct-Size.png" />
      </Head>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>The Anger SanitAIzer</h1>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Say the things you really want to say without the repercussions.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste your angry message here..."
        style={{
          width: "100%",
          padding: "1rem",
          marginBottom: "1rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
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

        <span style={{ fontSize: "0.9rem", color: "#444" }}>
          Nothing strips the personality out like A.I. Why not make it work for you?
        </span>
      </div>

      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>
      )}

      {sanitized && (
        <div
          style={{
            marginTop: "2rem",
            backgroundColor: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>SanitAIzed Version:</h3>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "1rem" }}>{sanitized}</pre>
        </div>
      )}

      <footer style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        The Anger SanitAIzer was created by Jack McNamara, a freelance advertising creative who would love to be hired by you.{" "}
        <a href="https://jack-mcnamara.com" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
          See his book
        </a>{" "}
        or{" "}
        <a href="mailto:jackmcnamara@duck.com" style={{ textDecoration: "underline" }}>
          contact him here
        </a>.
      </footer>

      {/* LEGAL DISCLAIMER */}
      <div style={{ marginTop: "2rem", fontSize: "0.75rem", color: "#bbb", textAlign: "center" }}>
        Disclaimer: The Anger SanitAIzer is intended for humorous and illustrative purposes only.
        It does not provide legal, HR, or psychological advice. Use at your own discretion.
      </div>
    </div>
  );
}
