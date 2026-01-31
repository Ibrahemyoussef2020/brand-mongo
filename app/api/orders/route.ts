import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";
import CartModel from "@/lib/models/CartModel";

const TEMP_USER_ID = "temp_user_123";

export async function GET(req: NextRequest) {
  await dbConnect();
  const userId = TEMP_USER_ID;
  
  const orders = await OrderModel.find({ user: userId }).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const userId = TEMP_USER_ID;

  // Create order from current cart
  const cart = await CartModel.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
  }

  const newOrder = await OrderModel.create({
      user: userId,
      items: cart.items,
      totalBill: cart.bill,
      status: "Pending"
  });

  // Clear cart after order
  await CartModel.findOneAndDelete({ user: userId });

  return NextResponse.json(newOrder);
}
