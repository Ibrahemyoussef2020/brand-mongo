import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HomeSection } from "@/lib/models/HomeSection";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function isAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return false;
    return true;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin())) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;
    
    const section = await HomeSection.findById(id);
    if (!section) {
        return NextResponse.json({ success: false, message: "Section not found" }, { status: 404 });
    }

    section.enabled = !section.enabled;
    await section.save();

    return NextResponse.json({ success: true, section }, { status: 200 });
  } catch (error: any) {
    console.error(`Error in PATCH /api/admin/home/sections/${params.id}/toggle:`, error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error: (error as Error).message || String(error) }, { status: 500 });
  }
}
