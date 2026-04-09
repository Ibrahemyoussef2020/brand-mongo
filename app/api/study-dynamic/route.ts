import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  try {
    console.log('API: Studying dynamic database structure...');
    await dbConnect();
    
    // Get sample products to understand the structure
    const sampleProducts = await ProductModel.find({}).limit(10).lean();
    
    // Get all distinct field names
    const fields = Object.keys(sampleProducts[0] || {});
    
    // Check for category field
    const hasCategory = fields.includes('category');
    const hasSection = fields.includes('section');
    
    // Get distinct values for category and section
    let categoryValues = [];
    let sectionValues = [];
    
    if (hasCategory) {
      categoryValues = await ProductModel.distinct('category');
    }
    
    if (hasSection) {
      sectionValues = await ProductModel.distinct('section');
    }
    
    // Test different queries
    const queries = {
      dealOffers: await ProductModel.find({ static_id: { $regex: "^deal-" } }).limit(2).lean(),
      homeSections: await ProductModel.find({ static_id: { $regex: "^home-" } }).limit(2).lean(),
      consumerSections: await ProductModel.find({ static_id: { $regex: "^consumer-" } }).limit(2).lean(),
      fashion: await ProductModel.find({ section: "fashion" }).limit(2).lean(),
    };
    
    return NextResponse.json({
      databaseStructure: {
        totalFields: fields.length,
        fields: fields,
        hasCategoryField: hasCategory,
        hasSectionField: hasSection,
      },
      distinctValues: {
        categories: categoryValues,
        sections: sectionValues,
      },
      sampleQueries: Object.keys(queries).reduce((acc, key) => {
        acc[key] = {
          count: queries[key as keyof typeof queries].length,
          samples: queries[key as keyof typeof queries].map(p => ({
            static_id: p.static_id,
            title: p.title,
            section: p.section,
            category: p.category,
            // Show all fields to understand structure
            allFields: Object.keys(p)
          }))
        };
        return acc;
      }, {} as any)
    });
  } catch (error) {
    console.error("API Study error:", error);
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  }
}
