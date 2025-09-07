
import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());

app.use(cors());
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

console.log("API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Not loaded");


app.post("/api/chat", async (req, res) => {
    console.log("Received request body:", req.body);

    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Missing 'query' in request body." });
        }
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an assistant that determines if a user's reason to access a website matches their productivity goals."
                },
                {
                    role: "user",
                    content: query
                }
            ]
        });
        res.json({ reply: chatCompletion.choices[0].message.content });
        console.log("Sent response:", chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || error.toString() });
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'))










