import razorpay from "./razorpay.client";

interface CreateRazorpayOrderInput {
  amount: number;
  receipt: string;
}

class RazorpayService {
  async createOrder(
    input: CreateRazorpayOrderInput
  ) {
    const order =
      await razorpay.orders.create({
        amount: Math.round(
          input.amount * 100
        ),

        currency: "INR",

        receipt:
          input.receipt,

        notes: {
          source: "paceshift",
        },
      });

    return order;
  }
}

const razorpayService =
  new RazorpayService();

export default razorpayService;