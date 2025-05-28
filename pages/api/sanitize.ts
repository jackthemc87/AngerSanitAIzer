import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a polite, professional assistant who rewrites angry messages into warm, respectful, and HR-safe language."
        },
        {
          role: "user",
          content: `Rewrite this message professionally:\n\n"${text}"`
        }
      ],
      temperature: 0.7,
    });

    const sanitized = response.data.choices[0].message?.content || "";
    res.status(200).json({ sanitized });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sanitize message." });
  }
}
