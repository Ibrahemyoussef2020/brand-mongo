import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  try {
    console.log('API: Testing database connection...');
    await dbConnect();
    
    // Test 1: Count total products
    const totalCount = await ProductModel.countDocuments();
    console.log(`API: Total products in database: ${totalCount}`);
    
    // Test 2: Find any deal offers
    const dealCount = await ProductModel.countDocuments({ 
      static_id: { $regex: "^deal-" }
    });
    console.log(`API: Deal offers found: ${dealCount}`);
    
    // Test 3: Get sample product
    const sample = await ProductModel.findOne().lean() as any;
    console.log(`API: Sample product:`, sample?.static_id);
    
    return NextResponse.json({
      totalProducts: totalCount,
      dealOffers: dealCount,
      sampleProduct: sample ? {
        static_id: (sample as any).static_id,
        title: (sample as any).title,
        section: (sample as any).section
      } : null,
      databaseConnected: true
    });
  } catch (error) {
    console.error("API Database test error:", error);
    return NextResponse.json({
      error: (error as Error).message || String(error),
      databaseConnected: false
    }, { status: 500 });
  }
}
