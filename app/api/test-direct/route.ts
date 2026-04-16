import { NextResponse } from "next/server";
import { products } from "@/db";

export async function GET() {
  try {
    console.log('API: Testing direct data from db.ts...');
    
    // Test deal offers from db.ts
    const dealOffers = products.filter(p => String(p.static_id)?.startsWith('deal-'));
    
    // Test home sections from db.ts
    const homeSections = products.filter(p => String(p.static_id)?.startsWith('home-'));
    
    // Test consumer sections from db.ts
    const consumerSections = products.filter(p => String(p.static_id)?.startsWith('consumer-'));
    
    // Test fashion from db.ts
    const fashion = products.filter(p => p.section === 'fashion');
    
    // Check structure of first deal offer
    const firstDeal = dealOffers[0];
    
    return NextResponse.json({
      message: "Direct data test from db.ts",
      structure: {
        totalProducts: products.length,
        dealOffersCount: dealOffers.length,
        homeSectionsCount: homeSections.length,
        consumerSectionsCount: consumerSections.length,
        fashionCount: fashion.length,
      },
      sampleDealOffer: firstDeal ? {
        static_id: (firstDeal as any).static_id,
        title: (firstDeal as any).title,
        section: (firstDeal as any).section,
        allFields: Object.keys(firstDeal)
      } : null,
      needsSeeding: false
    });
  } catch (error: any) {
    console.error("API Direct test error:", error);
    return NextResponse.json({
      error: error.message || String(error)
    }, { status: 500 });
  }
}
