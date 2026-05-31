import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.json());
app.use(express.static("public"));

app.post("/api/generate", async (req, res) => {
  try {
    const topic = String(req.body.topic || "").trim();
    if (!topic) return res.status(400).json({ error: "Topic is required." });
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY in .env file." });
    }

    const prompt = `You are the host of "Wrong Answers Only" — a quiz where EVERY answer is wrong. No correct answer exists anywhere.

Topic: ${topic}

Rules:
1. Ask a real factual question about the topic
2. Give EXACTLY 4 answers — ALL factually wrong, the real answer must NOT appear
3. Make wrong answers plausible-sounding or funny
4. Write a witty 1-2 sentence explanation per answer for why it is wrong
5. Be funny. Remind the player all options were wrong.

Return ONLY valid JSON, no markdown, no extra text:
{"question":"...","answers":["w1","w2","w3","w4"],"explanations":["e0","e1","e2","e3"]}`;

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }]
    });

    const txt = msg.content
      .map(part => part.type === "text" ? part.text : "")
      .join("")
      .replace(/```json|```/g, "")
      .trim();

    const json = JSON.parse(txt);
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Wrong Answers Only running at http://localhost:${port}`);
});
