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
        <meta property="og:title" content="The Anger SanitAIzer" />
        <meta property="og:description" content=" your angry message. Get a professional response back. It's like a PR firm for your rage." />
        <meta property="og:image" content="https://i.ibb.co/fVQMH5GS/image.png" />
        <meta property="og:url" content="https://angersanitaizer.xyz" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Anger SanitAIzer" />
        <meta name="twitter:description" content=" your angry message. Get a professional response back. It's like a PR firm for your rage." />
        <meta name="twitter:image" content="https://i.ibb.co/fVQMH5GS/image.png" />

        <style>{`
          @keyframes shake {
            0% { transform: translate(0); }
            20% { transform: translate(-1px, 1px); }
            40% { transform: translate(-1px, -1px); }
            60% { transform: translate(1px, 1px); }
            80% { transform: translate(1px, -1px); }
            100% { transform: translate(0); }
          }

          .shaky {
            display: inline-block;
            color: red;
            animation: shake 0.3s ease-in-out infinite;
          }
        `}</style>
      </Head>

      {/* Centered headline and subhead */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          The <span className="shaky">Anger</span> SanitAIzer
        </h1>
        <p style={{ color: "#666" }}>
          Say the things you really want to say without the repercussions.
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Place your angry message here..."
        style={{
          width: "100%",
          padding: "1rem",
          marginBottom: "1rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
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
            fontSize: "1rem",
          }}
        >
          {loading ? "SanitAIzing..." : "SanitAIze It"}
        </button>
        <p style={{ fontSize: "0.9rem", color: "#444", marginTop: "0.75rem" }}>
          Nothing strips out emotion like A.I. Why not take advantage?
        </p>
      </div>

      <p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "1rem", lineHeight: "1.4", textAlign: "center" }}>
        <strong>TIP:</strong> Avoid using the word <em>"you"</em> without specifying who you're talking to as this confuses the Anger SanitAIzer.
        <br />
        <span style={{ display: "block", marginTop: "0.5rem" }}>❌ <code>"You are an idiot."</code></span>
        <span>✅ <code>"Jack, you are an idiot."</code></span>
      </p>

      {error && (
        <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>{error}</div>
      )}

      {sanitized && (
        <>
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "#f9f9f9",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              animation: "fadeIn 0.4s ease-in-out",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Clean Version:</h3>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "1rem" }}>{sanitized}</pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(sanitized);
                alert("Copied to clipboard!");
              }}
              style={{
                marginTop: "0.75rem",
                fontSize: "0.85rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📋 Copy to Clipboard
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
              📸 <strong>Share this!</strong>
            </p>
            <p style={{ fontSize: "0.75rem", color: "#888" }}>
              Screenshot and tag <strong>@jackthemc</strong> on IG & TikTok
            </p>
          </div>
        </>
      )}

      <footer style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999", textAlign: "center" }}>
        The Anger SanitAIzer was created by Jack McNamara, a freelance advertising creative who would love to be hired by you.{" "}
        <a href="https://jack-mcnamara.com" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
          See his book
        </a>{" "}
        or{" "}
        <a href="mailto:jackmcnamara@duck.com" style={{ textDecoration: "underline" }}>
          contact him here
        </a>.
      </footer>

      <div style={{ marginTop: "2rem", fontSize: "0.75rem", color: "#bbb", textAlign: "center" }}>
        Disclaimer: The Anger SanitAIzer is intended for humorous and illustrative purposes only.
        It does not provide legal, HR, or psychological advice. Use at your own discretion.
      </div>
    </div>
  );
}
