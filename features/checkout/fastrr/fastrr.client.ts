// features/checkout/fastrr/fastrr.client.ts

import crypto from "crypto";

const FASTRR_API_URL =
  process.env.FASTRR_API_URL ?? "https://checkout-api.shiprocket.com";

const API_KEY = process.env.FASTRR_API_KEY!;
const SECRET_KEY = process.env.FASTRR_SECRET_KEY!;

function createHmac(body: string) {
  return crypto
    .createHmac("sha256", SECRET_KEY)
    .update(body)
    .digest("base64");
}

export async function createFastrrCheckout(payload: unknown) {
  const body = JSON.stringify(payload);

  const response = await fetch(
    `${FASTRR_API_URL}/api/v1/access-token/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
        "X-Api-HMAC-SHA256": createHmac(body),
      },
      body,
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok || !data?.result?.token) {
    console.error("Fastrr checkout error:", data);
    throw new Error("Unable to initiate checkout");
  }

  return data.result;
}