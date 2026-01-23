import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import DealOffersModel from "@/lib/models/DealOffersModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

function buildQuery(searchParams: URLSearchParams) {
  const query: any = {};

  if (searchParams.has("category")) {
    query.category = { $in: searchParams.getAll("category") };
    console.log('categoryy', query.category);

  }

  if (searchParams.has("brand")) {
    query.brand = { $in: searchParams.getAll("brand") };
  }

  if (searchParams.has("color")) {
    query.color = { $in: searchParams.getAll("color") };
  }

  if (searchParams.has("avgRating")) {
    query.avgRating = { $in: searchParams.getAll("avgRating").map(Number) };
  }

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  if (searchParams.has("ratings")) {
    query.ratings = { $gte: parseFloat(searchParams.get("ratings")!) };
  }

  if (searchParams.has("description")) {
    query.description = { $regex: searchParams.get("description"), $options: "i" };
  }
  ["free_delivery", "to_home", "premium_offer", "verified"].forEach((field) => {
    if (searchParams.has(field)) {
      query[field] = searchParams.get(field) == "true";
    }
  });

  return query;
}

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

async function fetchProducts(query: any, page: number, limit: number, isPaginationEnabled: boolean) {
  let products;
  let totalProducts = 0;
  let totalPages = 1;

  if (isPaginationEnabled) {
    const skip = (page - 1) * limit;
    products = await DealOffersModel.find(query).skip(skip).limit(limit);
    console.log('products', products);
    totalProducts = await DealOffersModel.countDocuments(query);
    totalPages = Math.ceil(totalProducts / limit);
  } else {
    products = await DealOffersModel.find(query);
    totalProducts = products.length;
  }

  return { products, totalProducts, totalPages };
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const query = buildQuery(searchParams);

    const { isPaginationEnabled, page, limit } = getPaginationParams(searchParams);

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
