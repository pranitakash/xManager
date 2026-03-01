import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No API key");
    process.exit(1);
}

const client = new GoogleGenerativeAI(apiKey);
const generativeModel = client.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
    },
    tools: [{ googleSearch: {} } as any],
    systemInstruction: "You are a helpful assistant.",
});

async function main() {
    try {
        const result = await generativeModel.generateContent("What is the current price of Bitcoin?");
        console.log("Success:", result.response.text());
    } catch (e) {
        console.error("Error:", e.message);
    }
}

main();
