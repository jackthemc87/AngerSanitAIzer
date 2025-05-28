import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { text } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a polite, professional assistant who rewrites angry or inappropriate messages into warm, diplomatic, HR-approved language.",
        },
        {
          role: "user",
          content: `Rewrite this message professionally:\n\n"${text}"`,
        },
      ],
    });

    const sanitized = chatCompletion.choices[0].message?.content || "";
    res.status(200).json({ sanitized });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Failed to sanitize message." });
  }
}
