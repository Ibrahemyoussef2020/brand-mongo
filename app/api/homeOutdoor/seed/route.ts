import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import HomeOutdoorModel from "@/lib/models/HomeOutdoorModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    const { homeOutdoor } = data;

    await dbConnect();

    await HomeOutdoorModel.updateMany({}, { $rename: { section: "category" } });

    await HomeOutdoorModel.deleteMany();
    await HomeOutdoorModel.insertMany(homeOutdoor);


    return NextResponse.json({
        message: 'Sended Successfuly',
        data: homeOutdoor
    })
}