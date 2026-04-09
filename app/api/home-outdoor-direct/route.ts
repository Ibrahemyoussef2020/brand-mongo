import { NextResponse } from "next/server";
import { products } from "@/db";

export async function GET() {
  try {
    console.log('API: Fetching home outdoor directly from db.ts...');
    
    // Filter home outdoor items from the static data
    const homeOutdoor = products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('home-'));
    
    console.log(`API: Found ${homeOutdoor.length} home outdoor items from db.ts`);
    
    return NextResponse.json({
      total: homeOutdoor.length,
      data: homeOutdoor
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
