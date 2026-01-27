import { NextRequest, NextResponse } from "next/server";
import { getProductsFromDB } from "@/lib/db/fetchProducts";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await getProductsFromDB(searchParams);

    return NextResponse.json(result);
  } catch (error: any) {
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
