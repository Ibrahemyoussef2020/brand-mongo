import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/dbConnect";
import CartModel from "@/lib/models/CartModel";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover", // Use latest or pinned version
});

const TEMP_USER_ID = "temp_user_123"; // TODO: Replace with real auth

export async function POST(req: NextRequest) {
  try {
    const { items, amount } = await req.json();

    // Secure calculation: Fetch total from DB to prevent client-side manipulation
    // For now, we trust the cart in DB for the user
    await dbConnect();
    const cart = await CartModel.findOne({ user: TEMP_USER_ID });

    if (!cart) {
         return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Calculate amount from cart to be safe (in cents)
    const storedAmount = Math.round(cart.bill * 100); 

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: storedAmount,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
