import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Correct model name
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  // ❌ responseMimeType removed (IMPORTANT FIX)
};

export const AIChatSession = model.startChat({
  generationConfig,
  history: [],
});

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// // Function to create a new chat session
// export const createAIChatSession = async () => {
//   try {
//     const chatSession = await model.startChat({
//       generationConfig,
//       history: [], // Start with an empty chat history
//     });
//     return chatSession;
//   } catch (error) {
//     console.error("Error starting Gemini AI chat session:", error);
//     throw error;
//   }
// };
