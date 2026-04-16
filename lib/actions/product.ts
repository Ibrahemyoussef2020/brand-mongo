"use server";

import { getProductsFromDB } from "@/lib/db/fetchProducts";
import { shouldSkipDatabase } from "@/lib/db/buildGuard";

// Map frontend category names to database category names
// Identity mapping: return the category as is. Previously there was a mapping that altered category names, causing mismatches with DB values.
const mapCategoryToDatabase = (frontendCategory: string): string => {
  return frontendCategory;
};

export async function fetchProductsAction(params: Record<string, any>) {
  try {
    // Skip database during build/development with mock data
    if (shouldSkipDatabase()) {
      return {
        total: 0,
        page: null,
        limit: null,
        totalPages: null,
        data: []
      };
    }
    
    // Map category if present
    if (params.category) {
      params.category = mapCategoryToDatabase(params.category);
      console.log(`Mapped category: ${params.category}`);
    }
    
    const result = await getProductsFromDB(params);
    console.log(`Found ${result.data?.length || 0} products`);
    // Serialize Mongoose documents to plain objects (converts ObjectId, Date, etc. to strings)
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error in fetchProductsAction:", error);
    
    // Return fallback data instead of throwing to prevent 500 errors
    return {
      total: 0,
      page: null,
      limit: null,
      totalPages: null,
      data: [],
      error: "Database temporarily unavailable"
    };
  }
}
