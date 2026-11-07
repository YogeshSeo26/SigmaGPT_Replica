
// Open AI Code from open ai developer site
// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const response = await client.responses.create({
//     model: 'gpt-4o-mini',
//     input: 'Joke related to Computer Science',
//     // input: 'Differences between SQL & MongoDB',
// });

// console.log(response.output_text);

import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

// Needed when we call backend while using frontend
app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const connectDB = async() => {

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Databases!");
  } catch(err) {
    console.log("Failed to connect with Db", err);
  };
};

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

// app.post("/test", async(req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [{
//           role: "user",
//           content: req.body.message,
//       }],
//     }),
//   };

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data = await response.json();
//     // console.log(data.choices[0].message.content); // reply
//     res.send(data.choices[0].message.content); // reply
//   } catch(err) {
//     console.log(err);
//   };
// });