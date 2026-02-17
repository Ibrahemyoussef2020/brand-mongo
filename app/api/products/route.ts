import { getProductsFromDB } from "@/lib/db/fetchProducts";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await getProductsFromDB(searchParams);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}
