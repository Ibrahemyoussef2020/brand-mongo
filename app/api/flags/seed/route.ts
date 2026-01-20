import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import FlagsModel from "@/lib/models/FlagsModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    const { flags } = data;

    await dbConnect();

    await FlagsModel.deleteMany();
    await FlagsModel.insertMany(flags);


    return NextResponse.json({
        message: 'Sended Successfuly',
        data: flags
    })
}