import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  try {
    console.log('API: Fetching home outdoor from products collection...');
    await dbConnect();
    
    // Fetch home outdoor items (products with static_id starting with "home-")
    const result = await ProductModel.find({ 
      static_id: { $regex: "^home-" }
    }).lean();
    
    console.log(`API: Found ${result.length} home outdoor items`);
    
    return NextResponse.json({
      total: result.length,
      data: result
    });
  } catch (error) {
    console.error("API Error fetching home outdoor:", error);
    return NextResponse.json({
      total: 0,
      data: [],
      error: "Failed to fetch home outdoor"
    }, { status: 500 });
  }
}
