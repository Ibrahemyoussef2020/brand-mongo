import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HomeSection } from "@/lib/models/HomeSection";
import { homeSectionSchema } from "@/lib/validations/homeSection";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function isAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return false;
    return true;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin())) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const validation = homeSectionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation error", errors: validation.error.format() }, { status: 400 });
    }

    const updatedSection = await HomeSection.findByIdAndUpdate(id, validation.data, { new: true, runValidators: true });
    
    if (!updatedSection) {
        return NextResponse.json({ success: false, message: "Section not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, section: updatedSection }, { status: 200 });
  } catch (error: any) {
    console.error(`Error in PUT /api/admin/home/sections/${params.id}:`, error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      if (!(await isAdmin())) {
          return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      }
  
      await dbConnect();
      const { id } = params;
  
      const deletedSection = await HomeSection.findByIdAndDelete(id);
      
      if (!deletedSection) {
          return NextResponse.json({ success: false, message: "Section not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Section deleted successfully" }, { status: 200 });
    } catch (error: any) {
      console.error(`Error in DELETE /api/admin/home/sections/${params.id}:`, error);
      return NextResponse.json({ success: false, message: "Internal Server Error", error: error.message }, { status: 500 });
    }
  }
