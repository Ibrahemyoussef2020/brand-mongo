import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // For admin, fetch all orders
    const orders = await OrderModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error in GET /api/admin/orders:", error);
    return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
  }
}