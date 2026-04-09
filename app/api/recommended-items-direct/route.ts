import { NextResponse } from "next/server";
import { products } from "@/db";

export async function GET() {
  try {
    console.log('API: Fetching recommended items directly from db.ts...');
    
    // Filter recommended items from the static data (to_home: true)
    const recommendedItems = products.filter(p => p.to_home === true);
    
    console.log(`API: Found ${recommendedItems.length} recommended items from db.ts`);
    
    return NextResponse.json({
      total: recommendedItems.length,
      data: recommendedItems
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
