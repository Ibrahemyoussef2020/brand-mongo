import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import RecommendedItemsModal from "@/lib/models/RecommendedItemsModel";
import data from "@/lib/data";

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
    query.$or = [
      { "description.en": { $regex: get("description"), $options: "i" } },
      { "description.ar": { $regex: get("description"), $options: "i" } }
    ];
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

  const get = (key: string) => searchParams instanceof URLSearchParams ? searchParams.get(key) : searchParams[key];
  const shouldSeed = get('seed') === 'true';

  if (shouldSeed) {
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(data.products);
  }

  const query = buildProductQuery(searchParams);
  const { isPaginationEnabled, page, limit } = getPaginationParams(searchParams);

  let products;
  let totalProducts = 0;
  let totalPages = 1;

  if (isPaginationEnabled) {
    const skip = (page - 1) * limit;
    products = await ProductModel.find(query).skip(skip).limit(limit).lean();
    totalProducts = await ProductModel.countDocuments(query);
    totalPages = Math.ceil(totalProducts / limit);
  } else {
    products = await ProductModel.find(query).lean();
    console.log("no pagggggghhhhhhhhhggggination" , query, products);

    totalProducts = products.length;
  }


  return {
    total: totalProducts,
    page: isPaginationEnabled ? page : null,
    limit: isPaginationEnabled ? limit : null,
    totalPages: isPaginationEnabled ? totalPages : null,
    data: products,
  };
}

export async function getSingleProductFromDB(static_id: string) {
  await dbConnect();
  
  // First try to find in database
  let product = await ProductModel.findOne({ static_id }).lean();
  
  // If not found in DB, try to find in seed data and add to DB
  if (!product) {
    const seedProduct = data.products.find((p) => p.static_id === static_id);
    if (seedProduct) {
      await ProductModel.create(seedProduct);
      product = await ProductModel.findOne({ static_id }).lean();
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
