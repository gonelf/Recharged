import Anthropic from "@anthropic-ai/sdk";

let _client: Anthropic | null = null;

// Lazy singleton — only instantiated on first call, not at module load time
// (prevents build-time errors when ANTHROPIC_API_KEY is not set)
export function getAnthropic(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _client;
}
