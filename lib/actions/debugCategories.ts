"use server";

import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function debugCategoriesAction() {
  try {
    await dbConnect();
    
    // Get all distinct categories
    const categories = await ProductModel.distinct("category.en").lean();
    const types = await ProductModel.distinct("type.en").lean();
    
    // Get a few sample products to see the structure
    const sampleProducts = await ProductModel.find({})
      .select("category.en type.en title static_id")
      .limit(5)
      .lean();
    
    return {
      categories,
      types,
      sampleProducts,
      message: "Debug info - check what categories actually exist"
    };
  } catch (error) {
    console.error("Debug categories error:", error);
    return {
      categories: [],
      types: [],
      sampleProducts: [],
      error: "Failed to debug categories"
    };
  }
}
