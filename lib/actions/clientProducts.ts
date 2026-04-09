"use server";

import { getProductsFromDB } from "@/lib/db/fetchProducts";
import { getRecommendedItemsFromDB } from "@/lib/db/fetchProducts";

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

export async function fetchDealOffersAction() {
  try {
    const result = await getProductsFromDB({ category: 'deal-offers' });
    return result;
  } catch (error) {
    console.error("Error fetching deal offers:", error);
    return {
      total: 0,
      page: null,
      limit: null,
      totalPages: null,
      data: [],
      error: "Failed to fetch deal offers"
    };
  }
}

export async function fetchHomeConsumerAction() {
  try {
    const result = await getProductsFromDB({ category: 'home-consumer' });
    return result;
  } catch (error) {
    console.error("Error fetching home consumer:", error);
    return {
      total: 0,
      page: null,
      limit: null,
      totalPages: null,
      data: [],
      error: "Failed to fetch home consumer products"
    };
  }
}

export async function fetchHomeOutdoorAction() {
  try {
    const result = await getProductsFromDB({ category: 'home-outdoor' });
    return result;
  } catch (error) {
    console.error("Error fetching home outdoor:", error);
    return {
      total: 0,
      page: null,
      limit: null,
      totalPages: null,
      data: [],
      error: "Failed to fetch home outdoor products"
    };
  }
}

export async function fetchProductsByCategoryAction(category: string) {
  try {
    const dbCategory = mapCategoryToDatabase(category);
    console.log(`Fetching products for category: ${category} -> ${dbCategory}`);
    
    const result = await getProductsFromDB({ category: dbCategory });
    console.log(`Found ${result.data?.length || 0} products for ${dbCategory}`);
    
    return result;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return {
      total: 0,
      page: null,
      limit: null,
      totalPages: null,
      data: [],
      error: `Failed to fetch products for category ${category}`
    };
  }
}

export async function fetchRecommendedItemsAction() {
  try {
    const result = await getRecommendedItemsFromDB();
    return result;
  } catch (error) {
    console.error("Error fetching recommended items:", error);
    return {
      data: [],
      error: "Failed to fetch recommended items"
    };
  }
}
