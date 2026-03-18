import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  if (!secretKey) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  if (!priceId) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_STRIPE_PRICE_ID" },
      { status: 500 }
    );
  }

  const normalizedAppUrl = appUrl.startsWith("http")
    ? appUrl
    : `https://${appUrl}`;

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${normalizedAppUrl}/app?checkout=success`,
    cancel_url: `${normalizedAppUrl}/app?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
