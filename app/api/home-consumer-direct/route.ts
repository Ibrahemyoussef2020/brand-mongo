import { NextResponse } from "next/server";
import { products } from "@/db";

export async function GET() {
  try {
    // Filter home consumer items from the static data
    const homeConsumer = products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('consumer-'));
    
    return NextResponse.json({
      total: homeConsumer.length,
      data: homeConsumer
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
