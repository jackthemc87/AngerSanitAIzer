import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You rewrite angry messages into polite, professional, friendly messages that HR would approve of."
        },
        {
          role: "user",
          content: `Rewrite this:\n\n"${text}"`
        }
      ]
    });

    res.status(200).json({ sanitized: chatCompletion.choices[0].message?.content || "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed." });
  }
}
