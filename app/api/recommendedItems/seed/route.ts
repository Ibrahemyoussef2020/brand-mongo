import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import RecommendedItemsModal from "@/lib/models/RecommendedItemsModel";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request:NextRequest)=>{
    const {recomendedItem} = data;        
    
    await dbConnect();

    await RecommendedItemsModal.deleteMany();
    await RecommendedItemsModal.insertMany(recomendedItem);


    return NextResponse.json({
        message:'Sended Successfuly',
        data:recomendedItem
    })
}