import crypto from "crypto";

const TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET is not set");
  return secret;
}

export function generateStripeAuthToken(userId: string): string {
  const timestamp = Date.now().toString();
  const payload = `${userId}.${timestamp}`;
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}.${sig}`).toString("base64url");
}

export function verifyStripeAuthToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const dotIndex = decoded.indexOf(".");
    const lastDotIndex = decoded.lastIndexOf(".");
    if (dotIndex === -1 || dotIndex === lastDotIndex) return null;

    const userId = decoded.slice(0, dotIndex);
    const rest = decoded.slice(dotIndex + 1);
    const restDotIndex = rest.lastIndexOf(".");
    if (restDotIndex === -1) return null;

    const timestamp = rest.slice(0, restDotIndex);
    const sig = rest.slice(restDotIndex + 1);

    const payload = `${userId}.${timestamp}`;
    const expected = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    if (sig !== expected) return null;
    if (Date.now() - parseInt(timestamp, 10) > TOKEN_TTL_MS) return null;

    return userId;
  } catch {
    return null;
  }
}
