import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import { products } from "@/db";

export async function POST() {
  try {
    console.log('API: Starting database seed...');
    await dbConnect();
    
    // Check if data already exists
    const existingCount = await ProductModel.countDocuments();
    console.log(`API: Existing products count: ${existingCount}`);
    
    if (existingCount > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        existingCount
      });
    }
    
    // Seed the database
    console.log(`API: Seeding ${products.length} products...`);
    const result = await ProductModel.insertMany(products);
    
    console.log(`API: Successfully seeded ${result.length} products`);
    
    return NextResponse.json({
      message: "Database seeded successfully",
      seededCount: result.length
    });
  } catch (error) {
    console.error("API Seed error:", error);
    return NextResponse.json({
      error: error.message,
      seededCount: 0
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const count = await ProductModel.countDocuments();
    
    return NextResponse.json({
      totalProducts: count,
      isSeeded: count > 0
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      totalProducts: 0
    }, { status: 500 });
  }
}
