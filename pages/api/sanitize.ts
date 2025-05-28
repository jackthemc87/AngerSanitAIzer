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

  if (!text) {
    return res.status(400).json({ error: "Missing input text" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional, diplomatic tone translator. Rewrite angry messages into warm, HR-approved language.",
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
    console.error("OpenAI error:", err.message);
    return res.status(500).json({ error: "Failed to sanitize message." });
  }
}
