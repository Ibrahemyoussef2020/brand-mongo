import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  try {
    console.log('API: Fetching home consumer from products collection...');
    await dbConnect();
    
    // Fetch home consumer items (products with static_id starting with "consumer-")
    const result = await ProductModel.find({ 
      static_id: { $regex: "^consumer-" }
    }).lean();
    
    console.log(`API: Found ${result.length} home consumer items`);
    
    return NextResponse.json({
      total: result.length,
      data: result
    });
  } catch (error) {
    console.error("API Error fetching home consumer:", error);
    return NextResponse.json({
      total: 0,
      data: [],
      error: "Failed to fetch home consumer"
    }, { status: 500 });
  }
}
