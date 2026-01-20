import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import HomeConsumerModel from "@/lib/models/HomeConsumer";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    const { homeConsumer } = data;

    await dbConnect();

    await HomeConsumerModel.updateMany({}, { $rename: { section: "category" } });

    await HomeConsumerModel.deleteMany();
    await HomeConsumerModel.insertMany(homeConsumer);


    return NextResponse.json({
        message: 'Sended Successfuly',
        data: homeConsumer
    })
}