import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  try {
    console.log('API: Checking database structure...');
    await dbConnect();
    
    // Get one sample product to see its structure
    const sample = await ProductModel.findOne().lean();
    
    if (!sample) {
      return NextResponse.json({
        error: "No products found in database",
        needsSeeding: true
      });
    }
    
    // Return the complete structure of one product
    return NextResponse.json({
      message: "Database structure analysis",
      sampleProduct: sample,
      fields: Object.keys(sample),
      hasCategory: 'category' in sample,
      hasSection: 'section' in sample,
      hasStaticId: 'static_id' in sample,
      needsSeeding: false
    });
  } catch (error) {
    console.error("API Structure check error:", error);
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  }
}
