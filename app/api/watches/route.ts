import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();
    const items = await ProductModel.find({ "category.en": "watches" }).lean();
    return NextResponse.json({
        message: 'Fetched Successfully',
        data: items
    })
}
