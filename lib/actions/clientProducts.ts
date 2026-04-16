"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
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
    // Check if this is being called from NextAuth
    const session = await getServerSession(authOptions);
    console.log('fetchDealOffersAction called, session:', session);
    
    // If session exists but we're getting session data instead of action result,
    // it means NextAuth is intercepting. We need to handle this differently.
    
    await dbConnect();
    const DealOffersModel = require("@/lib/models/DealOffersModel").default;
    const result = await DealOffersModel.find({}).lean();
    
    console.log(`Found ${result.length} deal offers`);
    
    const response = {
      total: result.length,
      page: null,
      limit: null,
      totalPages: null,
      data: result
    };
    return JSON.parse(JSON.stringify(response));
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
    await dbConnect();
    const HomeConsumerModel = require("@/lib/models/HomeConsumer").default;
    const result = await HomeConsumerModel.find({}).lean();
    
    const response = {
      total: result.length,
      page: null,
      limit: null,
      totalPages: null,
      data: result
    };
    return JSON.parse(JSON.stringify(response));
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
    await dbConnect();
    const HomeOutdoorModel = require("@/lib/models/HomeOutdoorModel").default;
    const result = await HomeOutdoorModel.find({}).lean();
    
    const response = {
      total: result.length,
      page: null,
      limit: null,
      totalPages: null,
      data: result
    };
    return JSON.parse(JSON.stringify(response));
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
    
    return JSON.parse(JSON.stringify(result));
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
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error fetching recommended items:", error);
    return {
      data: [],
      error: "Failed to fetch recommended items"
    };
  }
}
