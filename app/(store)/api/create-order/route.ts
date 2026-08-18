import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR" } = await request.json();

    const options = {
      amount: Math.round(amount * 100), // Amount in the smallest unit (e.g., paise for INR)
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Unable to create order" },
      { status: 500 }
    );
  }
}