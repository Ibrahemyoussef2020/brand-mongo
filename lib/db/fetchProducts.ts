import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import RecommendedItemsModal from "@/lib/models/RecommendedItemsModel";
import DealOffersModel from "@/lib/models/DealOffersModel";
import HomeConsumerModel from "@/lib/models/HomeConsumer";
import HomeOutdoorModel from "@/lib/models/HomeOutdoorModel";
import { HomeSection } from "@/lib/models/HomeSection";
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
  const conn = await dbConnect();

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

  if (!conn) {
    // Fallback to in-memory seed data when DB is unavailable (development)
    const matchesQuery = (product: any, queryObj: any): boolean => {
      const getValue = (obj: any, path: string) => {
        const parts = path.split('.');
        let v = obj;
        for (const p of parts) {
          if (v == null) return undefined;
          v = v[p];
        }
        return v;
      };

      const matchClause = (docVal: any, clause: any) => {
        if (clause && typeof clause === 'object') {
          if (clause.$in) return clause.$in.includes(docVal);
          if (clause.$gte !== undefined) {
            if (typeof docVal !== 'number') return false;
            if (clause.$gte !== undefined && docVal < clause.$gte) return false;
          }
          if (clause.$lte !== undefined) {
            if (typeof docVal !== 'number') return false;
            if (clause.$lte !== undefined && docVal > clause.$lte) return false;
          }
          if (clause.$regex) {
            const flags = clause.$options || '';
            const re = new RegExp(clause.$regex, flags.replace('i', 'i'));
            return re.test(String(docVal || ''));
          }
        }
        return docVal === clause;
      };

      for (const key of Object.keys(queryObj)) {
        if (key === '$or' && Array.isArray(queryObj.$or)) {
          const orClauses = queryObj.$or;
          if (!orClauses.some((c: any) => {
            const subKey = Object.keys(c)[0];
            return matchClause(getValue(product, subKey), c[subKey]);
          })) return false;
          continue;
        }

        const clause = queryObj[key];
        const docVal = getValue(product, key);
        if (!matchClause(docVal, clause)) return false;
      }

      return true;
    };

    const filtered = data.products.filter((p: any) => matchesQuery(p, query));
    totalProducts = filtered.length;
    if (isPaginationEnabled) {
      const skip = (page - 1) * limit;
      products = filtered.slice(skip, skip + limit);
      totalPages = Math.ceil(totalProducts / limit);
    } else {
      products = filtered;
    }
  } else {
    const section = get('section') || 'products';
    
    const SECTION_MODEL_MAP: Record<string, any> = {
      'products': ProductModel,
      'dealOffers': DealOffersModel,
      'homeConsumer': HomeConsumerModel,
      'homeOutdoor': HomeOutdoorModel,
      'homeSections': HomeSection,
      'recommendedItems': RecommendedItemsModal,
    };
    const TargetModel = SECTION_MODEL_MAP[section] || ProductModel;

    if (isPaginationEnabled) {
      const skip = (page - 1) * limit;
      products = await TargetModel.find(query).skip(skip).limit(limit).lean();
      totalProducts = await TargetModel.countDocuments(query);
      totalPages = Math.ceil(totalProducts / limit);
    } else {
      products = await TargetModel.find(query).lean();
      totalProducts = products.length;
    }

    // Map HomeSections to look like standard products for the dashboard
    if (section === 'homeSections' && products) {
      products = products.map((item: any) => ({
        _id: item._id,
        static_id: item.key,
        title: item.title || item.config?.productData?.title,
        price: item.config?.productData?.price || 0,
        oldPrice: item.config?.productData?.oldPrice || 0,
        stockCount: item.config?.productData?.stockCount || 0,
        category: item.subtitle || item.config?.productData?.category,
        image: item.config?.productData?.image || '',
        image2: item.config?.productData?.image2 || '',
        image3: item.config?.productData?.image3 || '',
        image4: item.config?.productData?.image4 || '',
        section: 'homeSections'
      }));
    }
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
  const conn = await dbConnect();

  // First try to find in database if connected
  let product: any = null;
  if (conn) {
    product = await ProductModel.findOne({ static_id }).lean();
  }

  // If not found in DB or no DB, try to find in seed data and add to DB when possible
  if (!product) {
    const seedProduct = data.products.find((p) => p.static_id === static_id);
    if (seedProduct) {
      if (conn) {
        await ProductModel.create(seedProduct);
        product = await ProductModel.findOne({ static_id }).lean();
      } else {
        product = seedProduct;
      }
    }
  }

  return product;
}

// --- Helpers for Recommended Items ---

export async function getRecommendedItemsFromDB() {
  const conn = await dbConnect();

  if (!conn) {
    return { data: data.recomendedItem || [] };
  }

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
