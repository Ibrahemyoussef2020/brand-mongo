export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/ProductModel";
import data from "@/lib/data";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  const static_id = params.id;

  if (!static_id) {
    return NextResponse.json(
      { message: "static_id is required" },
      { status: 400 }
    );
  }

  // نبحث في البيانات الستاتيك
  const product = data.products.find(
    (p) => p.static_id === static_id
  );

  if (!product) {
    return NextResponse.json(
      { message: "Product not found in seed data" },
      { status: 404 }
    );
  }

  // نتحقق لو المنتج موجود في DB
  const exists = await Product.findOne({ static_id });

  if (exists) {
    return NextResponse.json({
      message: "Product already exists",
      data: exists, // نرجع نسخة من DB بدل object الستاتيك
      status: 200,
    });
  }

  // نضيف المنتج للـ DB
  await Product.create(product);

  return NextResponse.json({
    message: "Product seeded successfully",
    data: product,
    status: 201,
  });
};
