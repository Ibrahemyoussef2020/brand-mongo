import { getProductsFromDB } from "@/lib/db/fetchProducts";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export const revalidate = 60; // Cache for 1 minute - critical for performance

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await getProductsFromDB(searchParams);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { static_id, price, oldPrice, stockCount, title, category, type, brand, description, image, image2, image3, image4 } = body;

    if (!static_id || !title || !category) {
      return NextResponse.json({ error: "static_id, title, and category are required" }, { status: 400 });
    }

    const newProduct = await ProductModel.create({
      static_id,
      price: price || 0,
      oldPrice: oldPrice || 0,
      stockCount: stockCount || 0,
      title,
      category,
      type,
      brand,
      description,
      image: image || '',
      image2: image2 || '',
      image3: image3 || '',
      image4: image4 || ''
    });

    return NextResponse.json({ 
      success: true, 
      message: "Product created successfully", 
      product: newProduct 
    });
  } catch (error: any) {
    console.error("Error in POST /api/products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { productId, price, oldPrice, stockCount, title, category, type, brand, description, image, image2, image3, image4 } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (price !== undefined) updateData.price = price;
    if (oldPrice !== undefined) updateData.oldPrice = oldPrice;
    if (stockCount !== undefined) updateData.stockCount = stockCount;
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (type) updateData.type = type;
    if (brand) updateData.brand = brand;
    if (description) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (image2 !== undefined) updateData.image2 = image2;
    if (image3 !== undefined) updateData.image3 = image3;
    if (image4 !== undefined) updateData.image4 = image4;

    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Product updated successfully", 
      product: updatedProduct 
    });
  } catch (error: any) {
    console.error("Error in PUT /api/products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
