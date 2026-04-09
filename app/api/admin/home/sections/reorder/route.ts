import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HomeSection } from "@/lib/models/HomeSection";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

async function isAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return false;
    return true;
}

export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { orderedIds } = await req.json();

    if (!Array.isArray(orderedIds)) {
        return NextResponse.json({ success: false, message: "orderedIds must be an array of strings" }, { status: 400 });
    }

    // Validation: make sure there are no duplicates
    const uniqueIds = new Set(orderedIds);
    if (uniqueIds.size !== orderedIds.length) {
        return NextResponse.json({ success: false, message: "Duplicate IDs are not allowed" }, { status: 400 });
    }

    // Validate that all orderedIds actually exist in DB
    const existingSectionsCount = await HomeSection.countDocuments({ _id: { $in: orderedIds } });
    if (existingSectionsCount !== orderedIds.length) {
        return NextResponse.json({ success: false, message: "Some IDs do not exist in the database" }, { status: 400 });
    }

    // Use bulkWrite for atomic update
    const bulkOps = orderedIds.map((id: string, index: number) => ({
        updateOne: {
            filter: { _id: id },
            update: { $set: { order: index } }
        }
    }));

    if (bulkOps.length > 0) {
        await HomeSection.bulkWrite(bulkOps);
    }

    return NextResponse.json({ success: true, message: "Sections reordered successfully" }, { status: 200 });
  } catch (error: any) {
    console.error(`Error in PATCH /api/admin/home/sections/reorder:`, error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
