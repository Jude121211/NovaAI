import fetch from "node-fetch";

export default async function handler(req, res) {
  const { prompt } = req.body;

  if(!prompt) return res.status(400).json({ answer: "No prompt provided." });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_KEY
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    res.status(200).json({ answer: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "AI is not available right now." });
  }
}
