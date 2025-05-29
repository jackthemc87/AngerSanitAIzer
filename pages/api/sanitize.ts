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
          content: "You are a professional, diplomatic tone translator that takes whatever you are given and creates a more polite version of it. Rewrite entries into warm, friendly, bubbly, and/or HR-approved language. NEVER react as if you are the one being addressed. .",
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
