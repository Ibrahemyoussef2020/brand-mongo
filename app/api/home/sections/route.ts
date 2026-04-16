import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HomeSection } from "@/lib/models/HomeSection";
import ProductModel from "@/lib/models/ProductModel"; 

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const productModel = ProductModel;

    const { searchParams } = new URL(req.url);
    const includeProducts = searchParams.get('includeProducts') !== 'false'; 

    let sections = await HomeSection.find({ enabled: true, status: 'published' })
                                  .sort({ order: 1 })
                                  .lean();

    if (includeProducts) {
      sections = await Promise.all(sections.map(async (section: any) => {
        if (section.itemsSource && section.itemsSource.mode === 'manual' && section.itemsSource.productIds && section.itemsSource.productIds.length > 0) {
            const products = await ProductModel.find({
              _id: { $in: section.itemsSource.productIds }
            })
            .select('_id static_id title image price oldPrice badge discount ratings free_delivery to_home')
            .lean();

            const populatedProducts = section.itemsSource.productIds.map((id: any) => 
               products.find((p: any) => p._id.toString() === id.toString())
            ).filter(Boolean);

            section.products = populatedProducts;
        } else if (section.itemsSource && section.itemsSource.mode === 'query') {
            const query: any = {};
            if (section.itemsSource.categoryId) {
                 query['category.en'] = section.itemsSource.categoryId;
            }
            if (section.itemsSource.collectionId) {
                 query['type.en'] = section.itemsSource.collectionId;
            }
            let mongoQuery = ProductModel.find(query);
            
            if (section.itemsSource.sort === 'newest') mongoQuery = mongoQuery.sort({ createdAt: -1 });
            else if (section.itemsSource.sort === 'priceLow') mongoQuery = mongoQuery.sort({ price: 1 });
            else if (section.itemsSource.sort === 'priceHigh') mongoQuery = mongoQuery.sort({ price: -1 });
            else if (section.itemsSource.sort === 'topRated') mongoQuery = mongoQuery.sort({ ratings: -1 });

            if (section.itemsSource.limit) {
                mongoQuery = mongoQuery.limit(section.itemsSource.limit);
            } else {
                mongoQuery = mongoQuery.limit(10); // Default limit
            }

            const products = await mongoQuery.select('_id static_id title image price oldPrice badge discount ratings free_delivery to_home').lean();
            section.products = products;
        }
        return section;
      }));
    }

    return NextResponse.json({ success: true, sections }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/home/sections:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error: (error as Error).message || String(error) }, { status: 500 });
  }
}
