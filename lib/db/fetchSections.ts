import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import RecommendedItemsModal from "@/lib/models/RecommendedItemsModel";
import HomeOutdoorModel from "@/lib/models/HomeOutdoorModel";
import DealOffersModel from "@/lib/models/DealOffersModel";
import HomeConsumerModel from "@/lib/models/HomeConsumer";
import data from "@/lib/data";

export const SECTION_MODEL_MAP: Record<string, any> = {
  'products': ProductModel,
  'home-outdoor': HomeOutdoorModel,
  'deal-offers': DealOffersModel,
  'recommended': RecommendedItemsModal,
  'home-consumer': HomeConsumerModel,
  'homeOutdoor': HomeOutdoorModel,
  'dealOffers': DealOffersModel,
  'homeConsumer': HomeConsumerModel,
  'recommendedItems': RecommendedItemsModal,
};

// --- Helpers for Products ---

function buildProductQuery(searchParams: URLSearchParams | any) {
  const query: any = {};
  
  // Convert URLSearchParams to object if needed, or handle both
  const get = (key: string) => searchParams instanceof URLSearchParams ? searchParams.get(key) : searchParams[key];
  const getAll = (key: string) => searchParams instanceof URLSearchParams ? searchParams.getAll(key) : (Array.isArray(searchParams[key]) ? searchParams[key] : (searchParams[key] ? [searchParams[key]] : []));
  const has = (key: string) => searchParams instanceof URLSearchParams ? searchParams.has(key) : key in searchParams;

  if (has("category")) {
    query["category.en"] = { $in: getAll("category") };
  }
  if (has("type")) {
    query["type.en"] = { $in: getAll("type") };
  }
  if (has("brand")) { 
    query["brand.en"] = { $in: getAll("brand") };
  }
  if (has("color")) {
    query["color.en"] = { $in: getAll("color") };
  }
  if (has("avgRating")) {
    query.avgRating = { $in: getAll("avgRating").map(Number) };
  }

  const price_min = get("price_min");
  const price_max = get("price_max");

  if (price_min || price_max) {
    query.price = {};
    if (price_min) query.price.$gte = parseFloat(price_min);
    if (price_max) query.price.$lte = parseFloat(price_max);
  }

  if (has("ratings")) {
    query.ratings = { $gte: parseFloat(get("ratings")!) };
  }

  if (has("description")) {
    query["description.en"] = { $regex: get("description"), $options: "i" };
  }
  ["free_delivery", "to_home", "premium_offer", "verified"].forEach((field) => {
    if (has(field)) {
      query[field] = get(field) == "true" || get(field) === true;
    }
  });

  return query;
}

function getPaginationParams(searchParams: URLSearchParams | any) {
  const get = (key: string) => searchParams instanceof URLSearchParams ? searchParams.get(key) : searchParams[key];
  
  const pageParam = get("page");
  const limitParam = get("limit");

  const isPaginationEnabled = pageParam !== null && limitParam !== null && pageParam !== undefined && limitParam !== undefined;
  let page = 1;
  let limit = 100;

  if (isPaginationEnabled) {
    page = parseInt(pageParam || "1", 10);
    limit = parseInt(limitParam || "10", 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 100;
  }

  return { isPaginationEnabled, page, limit };
}

export async function getProductsFromDB(searchParams: URLSearchParams | any) {
  await dbConnect();

  // Determine which model to use
  const get = (key: string) => searchParams instanceof URLSearchParams ? searchParams.get(key) : searchParams[key];
  const section = get("section") || "products"; // Default to 'products' if no section provided
  
  const Model = SECTION_MODEL_MAP[section] || ProductModel;

  const query = buildProductQuery(searchParams);
  const { isPaginationEnabled, page, limit } = getPaginationParams(searchParams);

  let products;
  let totalProducts = 0;
  let totalPages = 1;

  if (isPaginationEnabled) {
    const skip = (page - 1) * limit;
    products = await Model.find(query).skip(skip).limit(limit).lean();
    totalProducts = await Model.countDocuments(query);
    totalPages = Math.ceil(totalProducts / limit);
  } else {
    products = await Model.find(query).lean();
    console.log("no pagggggghhhhhhhhhggggination" , query, products);

    totalProducts = products.length;
  }

  return {
    total: totalProducts,
    page: isPaginationEnabled ? page : null,
    limit: isPaginationEnabled ? limit : null,
    totalPages: isPaginationEnabled ? totalPages : null,
    data: products || [],
  };
}

export async function getSingleProductFromDB(static_id: string, section?: string) {
  await dbConnect();
  
  // First try to find in database using dynamic model if section provided
  const Model = section && SECTION_MODEL_MAP[section] ? SECTION_MODEL_MAP[section] : ProductModel;
  
  let product = await Model.findOne({ static_id }).lean();
  
  // If not found in DB, try to find in seed data and add to DB
  if (!product) {
    const safeData: any = data;

    // Check main products data
    let seedProduct = safeData.products?.find((p: any) => p.static_id === static_id);
    
    // Check specific section data if not found
    if (!seedProduct && section && safeData[section]) {
        seedProduct = safeData[section].find((p: any) => p.static_id === static_id);
    } 
    // Fallback: Check all sections in data if still not found
    else if (!seedProduct) {
         for (const key in safeData) {
             if (Array.isArray(safeData[key])) {
                 const found = safeData[key].find((p: any) => p?.static_id === static_id);
                 if (found) {
                     seedProduct = found;
                     break;
                 }
             }
         }
    }

    if (seedProduct) {
      await Model.create(seedProduct);
      product = await Model.findOne({ static_id }).lean();
    }
  }
  
  return product;
}

// --- Helpers for Recommended Items ---

export async function getRecommendedItemsFromDB() {
  await dbConnect();
  
  // Try to find existing items
  let items = await RecommendedItemsModal.find({}).lean();

  // If no items, seed them from data (Safe auto-seed)
  if (!items || items.length === 0) {
    const { recomendedItem } = data;
    if (recomendedItem && recomendedItem.length > 0) {
      await RecommendedItemsModal.insertMany(recomendedItem);
      items = await RecommendedItemsModal.find({}).lean();
    }
  }

  return { data: items };
}
