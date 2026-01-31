import dbConnect from "@/lib/dbConnect";
import HomeConsumerModel from "@/lib/models/HomeConsumer";
import data from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();


    const shouldSeed = request.nextUrl.searchParams.get('seed') === 'true';

    if (shouldSeed) {
        await HomeConsumerModel.deleteMany();
        await HomeConsumerModel.insertMany(data.homeConsumer);
    } else {
        const count = await HomeConsumerModel.countDocuments();
        if (count === 0) {
            await HomeConsumerModel.insertMany(data.homeConsumer);
        }
    }

    const homeConsumer = await HomeConsumerModel.find({}).lean();

    return NextResponse.json({
        message: 'Fetched Successfully',
        data: homeConsumer
    })
}
