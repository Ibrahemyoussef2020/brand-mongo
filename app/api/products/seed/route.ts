import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

/**
 * Extract query parameters and build the query object
 */
function buildQuery(searchParams: URLSearchParams) {
  const query: any = {};

  // Filtering by ID (single selection)
  if (searchParams.has("id")) {
    query.static_id = searchParams.get("id");
    return query; // If searching by ID, no need to add other filters
  }

  // Filtering by multiple categories (checkbox selection)
  if (searchParams.has("category")) {
    query.category = { $in: searchParams.getAll("category") };
  }

  // Filtering by multiple brands (checkbox selection)
  if (searchParams.has("brand")) {
    query.brand = { $in: searchParams.getAll("brand") };
  }

  // Filtering by multiple colors (checkbox selection)
  if (searchParams.has("color")) {
    query.color = { $in: searchParams.getAll("color") };
  }

  // Filtering by multiple avgRatings (checkbox selection)
  if (searchParams.has("avgRating")) {
    query.avgRating = { $in: searchParams.getAll("avgRating").map(Number) };
  }

  // Filtering by price range
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  // Filtering by ratings (minimum ratings)
  if (searchParams.has("ratings")) {
    query.ratings = { $gte: parseFloat(searchParams.get("ratings")!) };
  }

  // Filtering by description (partial text search)
  if (searchParams.has("description")) {
    query.description = { $regex: searchParams.get("description"), $options: "i" };
  }

  // Filtering by boolean fields (free_delivery, to_home, premium_offer, verified)
  ["free_delivery", "to_home", "premium_offer", "verified"].forEach((field) => {
    if (searchParams.has(field)) {
      query[field] = searchParams.get(field) === "true";
    }
  });

  return query;
}

/**
 * Handle pagination logic
 */
function getPaginationParams(searchParams: URLSearchParams) {
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const isPaginationEnabled = pageParam !== null && limitParam !== null;
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

/**
 * Fetch products based on query and pagination
 */
async function fetchProducts(query: any, page: number, limit: number, isPaginationEnabled: boolean) {
  let products;
  let totalProducts = 0;
  let totalPages = 1;

  if (isPaginationEnabled) {
    const skip = (page - 1) * limit;
    products = await ProductModel.find(query).skip(skip).limit(limit);
    totalProducts = await ProductModel.countDocuments(query);
    totalPages = Math.ceil(totalProducts / limit);
  } else {
    products = await ProductModel.find(query);
    totalProducts = products.length;
  }

  return { products, totalProducts, totalPages };
}

/**
 * Main GET function
 */
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    // Build the query based on filters
    const query = buildQuery(searchParams);

    // Get pagination parameters
    const { isPaginationEnabled, page, limit } = getPaginationParams(searchParams);

    // Fetch products with filters and pagination
    const { products, totalProducts, totalPages } = await fetchProducts(query, page, limit, isPaginationEnabled);

    return NextResponse.json({
      total: totalProducts,
      page: isPaginationEnabled ? page : null,
      limit: isPaginationEnabled ? limit : null,
      totalPages: isPaginationEnabled ? totalPages : null,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}








































// import data from "@/lib/data";
// import dbConnect from "@/lib/dbConnect";
// import ProductModel from "@/lib/models/ProductModel";
// import UserModel from "@/lib/models/UserModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: Request) {

//   await ProductModel.deleteMany();
//   await ProductModel.insertMany(data.products);

//   try {
//     await dbConnect();
//     const { searchParams } = new URL(req.url);

//     const query: any = {};

//     if (searchParams.has('id')) {
//       query.static_id = searchParams.get('id');
//       const product = await ProductModel.findOne(query);
//       return product
//         ? NextResponse.json(product)
//         : NextResponse.json({ message: 'Product not found' }, { status: 404 });
//     }

//     if (searchParams.has('category')) {
//       query.category = searchParams.get('category');
//     }

//     const pageParam = searchParams.get('page');
//     const limitParam = searchParams.get('limit');
    
//     const isPaginationEnabled = pageParam !== null && limitParam !== null; 

//     let products;
//     let totalProducts = 0;
//     let totalPages = 1;
//     let page = 1;
//     let limit = 0;

//     if (isPaginationEnabled) {
//       page = parseInt(pageParam || '1', 10);
//       limit = parseInt(limitParam || '10', 10);

//       if (isNaN(page) || page < 1) page = 1;
//       if (isNaN(limit) || limit < 1) limit = 100;

//       const skip = (page - 1) * limit;

//       products = await ProductModel.find(query).skip(skip).limit(limit);
//       totalProducts = await ProductModel.countDocuments(query);
//       totalPages = Math.ceil(totalProducts / limit);
//     } else {
//       products = await ProductModel.find(query);
//       totalProducts = products.length;
//     }

//     return NextResponse.json({
//       total: totalProducts,
//       page: isPaginationEnabled ? page : null,
//       limit: isPaginationEnabled ? limit : null,
//       totalPages: isPaginationEnabled ? totalPages : null,
//       data:products,
//     });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
//   }
// }
