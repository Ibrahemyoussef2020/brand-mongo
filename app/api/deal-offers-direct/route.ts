import { NextResponse } from "next/server";
import { products } from "@/db";

export async function GET() {
  try {
    console.log('API: Fetching deal offers directly from db.ts...');
    
    // Filter deal offers from the static data
    const dealOffers = products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('deal-'));
    
    console.log(`API: Found ${dealOffers.length} deal offers from db.ts`);
    
    return NextResponse.json({
      total: dealOffers.length,
      data: dealOffers
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
