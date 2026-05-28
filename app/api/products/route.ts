import { getProductsFromDB } from "@/lib/db/fetchProducts";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import DealOffersModel from "@/lib/models/DealOffersModel";
import HomeConsumerModel from "@/lib/models/HomeConsumer";
import HomeOutdoorModel from "@/lib/models/HomeOutdoorModel";
import { HomeSection } from "@/lib/models/HomeSection";
import RecommendedItemsModel from "@/lib/models/RecommendedItemsModel";

export const revalidate = 60; // Cache for 1 minute - critical for performance

// Map section values to their corresponding Mongoose models
const SECTION_MODEL_MAP: Record<string, any> = {
  'products': ProductModel,
  'dealOffers': DealOffersModel,
  'homeConsumer': HomeConsumerModel,
  'homeOutdoor': HomeOutdoorModel,
  'recommendedItems': RecommendedItemsModel,
};

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
    const { static_id, price, oldPrice, stockCount, title, category, type, brand, description, image, image2, image3, image4, section } = body;

    if (!static_id || !title || !category) {
      return NextResponse.json({ error: "static_id, title, and category are required" }, { status: 400 });
    }

    const productData = {
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
    };

    // Handle HomeSections separately since it has a different schema
    if (section === 'homeSections') {
      const newHomeSection = await HomeSection.create({
        key: static_id,
        type: 'GRID_SECTION',
        status: 'published',
        title: title,
        subtitle: { en: category?.en || '', ar: category?.ar || '' },
        order: 0,
        enabled: true,
        config: { productData },
        itemsSource: {
          mode: 'manual',
          limit: 1,
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: `Product created in Home Sections successfully`, 
        product: newHomeSection,
        section: 'homeSections'
      });
    }

    // Use the correct model based on the section
    const TargetModel = SECTION_MODEL_MAP[section || 'products'] || ProductModel;

    const newProduct = await TargetModel.create(productData);

    const sectionLabel = section || 'products';
    return NextResponse.json({ 
      success: true, 
      message: `Product created in ${sectionLabel} successfully`, 
      product: newProduct,
      section: sectionLabel
    });
  } catch (error: any) {
    console.error("Error in POST /api/products:", error);
    return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { productId, price, oldPrice, stockCount, title, category, type, brand, description, image, image2, image3, image4, section } = body;

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

    const TargetModel = SECTION_MODEL_MAP[section || 'products'] || ProductModel;
    
    // For HomeSections, we would need to update config.productData instead, 
    // but the dashboard currently passes standard fields. We will skip deep HomeSection edits for now or map them.
    if (section === 'homeSections') {
        const updateDataHomeSection = {
            title: title?.en || title,
            subtitle: category,
            'config.productData': {
                price, oldPrice, stockCount, title, category, type, brand, description, image, image2, image3, image4
            }
        };
        const updatedProduct = await TargetModel.findByIdAndUpdate(productId, { $set: updateDataHomeSection }, { new: true });
        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Product updated successfully", product: updatedProduct });
    }

    const updatedProduct = await TargetModel.findByIdAndUpdate(productId, updateData, { new: true });

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
    return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
  }
}
