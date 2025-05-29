import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: "Missing or empty input text." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // fallback from gpt-4
      messages: [
        {
          role: "system",
          content: "You are a language transformation tool, not a person. Your sole job is to rewrite any text you are given into a professional, warm, and HR-safe version — even if the original is angry, rude, or inappropriate. Never respond to the message. Never react to it. Never say “I’m sorry” or act as if you are being addressed. Simply output a rewritten version in friendly, polite, constructive language — as if it were being sent by a calm, experienced professional. Do not skip or censor the content — just transform the tone to be respectful, clear, and safe for the workplace.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const sanitized = response.choices[0].message.content;
    return res.status(200).json({ sanitized });
  } catch (err: any) {
    console.error("🔴 OpenAI Error:", err.message || err);
    return res.status(500).json({ error: "Failed to sanitize message." });
  }
}
