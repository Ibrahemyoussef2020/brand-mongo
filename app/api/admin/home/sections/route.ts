import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HomeSection } from "@/lib/models/HomeSection";
import { homeSectionSchema } from "@/lib/validations/homeSection";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Basic Admin middleware imitation
async function isAdmin() {
  const session = await getServerSession(authOptions);
  // Assuming session.user.role exists. Adjust depending on actual role field.
  // For now, if we just require authentication, we check session.
  if (!session || !session.user) {
    return false;
  }
  // To restrict to admin, uncomment and adjust:
  // if (session.user.role !== 'admin') return false;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Strict validation
    const validation = homeSectionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation error", errors: validation.error.format() }, { status: 400 });
    }

    const newSection = await HomeSection.create(validation.data);
    
    return NextResponse.json({ success: true, section: newSection }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/admin/home/sections:", error);
    if (error.code === 11000) {
        return NextResponse.json({ success: false, message: "Duplicate key, section already exists" }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error", error: (error as Error).message || String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
    
        await dbConnect();
        
        // Admin gets all sections, including drafted and disabled
        const sections = await HomeSection.find().sort({ order: 1 });
        
        return NextResponse.json({ success: true, sections }, { status: 200 });
    } catch (error: any) {
        console.error("Error in GET /api/admin/home/sections:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error", error: (error as Error).message || String(error) }, { status: 500 });
    }
}
