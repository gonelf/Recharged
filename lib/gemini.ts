import { GoogleGenerativeAI } from "@google/generative-ai";

let _client: GoogleGenerativeAI | null = null;

// Lazy singleton — only instantiated on first call, not at module load time
// (prevents build-time errors when GOOGLE_AI_API_KEY is not set)
export function getGemini(): GoogleGenerativeAI {
  if (!_client) {
    _client = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
  }
  return _client;
}
