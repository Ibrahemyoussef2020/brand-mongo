"use server";

import { getProductsFromDB } from "@/lib/db/fetchProducts";
import { shouldSkipDatabase } from "@/lib/db/buildGuard";

// Map frontend category names to database category names
const mapCategoryToDatabase = (frontendCategory: string): string => {
  const categoryMap: Record<string, string> = {
    'fashion': 'clothes',
    'mobiles': 'automobiles', 
    'kitchen-tools': 'homeInteriors',
    'computers': 'computerTech',
    'sports': 'sportsOutdoor',
    'pets': 'animalPets',
    'chairs': 'officeFurniture',
    'headphones': 'moreCategory',
    'deal-offers': 'dealOffers',
    'home-consumer': 'homeConsumer',
    'home-outdoor': 'homeOutdoor'
  };
  
  return categoryMap[frontendCategory] || frontendCategory;
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
    return result;
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
