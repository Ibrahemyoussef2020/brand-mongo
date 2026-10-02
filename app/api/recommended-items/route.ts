export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch recommended items (products with to_home: true)
    const result = await ProductModel.find({ 
      to_home: true 
    }).lean();
    
    return NextResponse.json({
      total: result.length,
      data: result
    });
  } catch (error) {
    console.error("API Error fetching recommended items:", error);
    return NextResponse.json({
      total: 0,
      data: [],
      error: "Failed to fetch recommended items"
    }, { status: 500 });
  }
}

