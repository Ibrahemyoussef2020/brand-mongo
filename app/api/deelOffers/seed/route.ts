import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import DealOffersModel from "@/lib/models/DealOffersModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    const { dealOffers } = data;

    await dbConnect();

    await DealOffersModel.updateMany({}, { $rename: { section: "category" } });

    await DealOffersModel.deleteMany();
    await DealOffersModel.insertMany(dealOffers);


    return NextResponse.json({
        message: 'Sended Successfuly',
        data: dealOffers
    })
}

