import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request:NextRequest)=>{
    const {users} = data;        

    await dbConnect();

    await UserModel.deleteMany();
    await UserModel.insertMany(users);


    return NextResponse.json({
        message:'Sended Successfuly',
        data:users
    })
}
