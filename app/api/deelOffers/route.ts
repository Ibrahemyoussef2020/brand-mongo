import dbConnect from "@/lib/dbConnect";
import DealOffersModel from "@/lib/models/DealOffersModel";
import data from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();

    const shouldSeed = request.nextUrl.searchParams.get('seed') === 'true';

    if (shouldSeed) {
        await DealOffersModel.deleteMany();
        await DealOffersModel.insertMany(data.dealOffers);
    } else {
        const count = await DealOffersModel.countDocuments();
        if (count === 0) {
            await DealOffersModel.insertMany(data.dealOffers);
        }
    }

    const dealOffers = await DealOffersModel.find({}).lean();

    return NextResponse.json({
        message: 'Fetched Successfully',
        data: dealOffers
    })
}
