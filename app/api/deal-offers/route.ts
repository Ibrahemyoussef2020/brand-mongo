import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  try {
    console.log('API: Fetching deal offers from products collection...');
    await dbConnect();
    
    // Fetch deal offers (products with static_id starting with "deal-")
    const result = await ProductModel.find({ 
      static_id: { $regex: "^deal-" }
    }).lean();
    
    console.log(`API: Found ${result.length} deal offers`);
    
    return NextResponse.json({
      total: result.length,
      data: result
    });
  } catch (error) {
    console.error("API Error fetching deal offers:", error);
    return NextResponse.json({
      total: 0,
      data: [],
      error: "Failed to fetch deal offers"
    }, { status: 500 });
  }
}
