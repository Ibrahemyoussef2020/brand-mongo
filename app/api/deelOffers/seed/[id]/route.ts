import dbConnect from "@/lib/dbConnect";
import DealOffersModel from "@/lib/models/DealOffersModel";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;

    const deal = await DealOffersModel.findOne({ static_id: id });

    if (!deal) {
      return NextResponse.json({ message: "Deal not found" }, { status: 404 });
    }

    return NextResponse.json(deal);
  } catch (error) {
    console.error("Error fetching deal:", error);
    return NextResponse.json({ message: "Failed to fetch deal" }, { status: 500 });
  }
}
