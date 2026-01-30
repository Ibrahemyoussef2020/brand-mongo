"use server";

import { getProductsFromDB } from "@/lib/db/fetchSections";

export async function fetchProductsAction(params: Record<string, any>) {
  try {
    const result = await getProductsFromDB(params);
    return JSON.parse(JSON.stringify(result));  
  } catch (error) {
    console.error("Error in fetchProductsAction:", error);
    throw new Error("Failed to fetch products");
  }
}
