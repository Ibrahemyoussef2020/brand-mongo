import dbConnect from "@/lib/dbConnect";
import HomeOutdoorModel from "@/lib/models/HomeOutdoorModel";
import data from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();

    const shouldSeed = request.nextUrl.searchParams.get('seed') === 'true';

    if (shouldSeed) {
        await HomeOutdoorModel.deleteMany();
        await HomeOutdoorModel.insertMany(data.homeOutdoor);
    } else {
        const count = await HomeOutdoorModel.countDocuments();
        if (count === 0) {
            await HomeOutdoorModel.insertMany(data.homeOutdoor);
        }
    }

    const homeOutdoor = await HomeOutdoorModel.find({}).lean();

    return NextResponse.json({
        message: 'Fetched Successfully',
        data: homeOutdoor
    })
}
