"use strict";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});

//asynchronous API route handler function
export default async function handler(req, res) {
  //Check if it is a post request
  if (req.method === "POST") {
    try {
      //log the data that comes back
      console.log("Received data:", req.body);
      //Create chat completion
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates LinkedIn posts with a ton of emojis. You will make these posts as cheesy as possible, and use the data the user provides as the starting point.",
          },
          {
            role: "user",
            content: req.body.prompt, // Use the prompt from the request body
          },
        ],
      });

      //Send back the generated content
      res.status(200).json({
        content: chatCompletion.choices[0].message.content,
      });
      //Catches and handles any errors that occur during the process
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to generate text" });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
