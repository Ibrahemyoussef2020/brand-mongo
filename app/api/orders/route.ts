import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";
import CartModel from "@/lib/models/CartModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const orders = await OrderModel.find({ user: userId }).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error in GET /api/orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const body = await req.json();
    const { paymentIntentId } = body;

    // Check if order with this paymentIntentId already exists (prevent duplicates)
    if (paymentIntentId) {
      const existingOrder = await OrderModel.findOne({ paymentIntentId });
      if (existingOrder) {
        return NextResponse.json({ 
          message: "Order already exists", 
          order: existingOrder 
        });
      }
    }

    // Create order from current cart
    const cart = await CartModel.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const newOrder = await OrderModel.create({
      user: userId,
      items: cart.items,
      totalBill: cart.bill,
      status: "Paid",
      paymentIntentId: paymentIntentId || null
    });

    // Clear cart after order
    await CartModel.findOneAndDelete({ user: userId });

    return NextResponse.json({ 
      success: true, 
      message: "Order created successfully", 
      order: newOrder 
    });
  } catch (error: any) {
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
