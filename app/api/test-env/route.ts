import { NextResponse } from "next/server";

export async function GET() {
  try {
    const envVars = {
      MONGODB_URI: process.env.MONGODB_URI ? "SET" : "NOT SET",
      NODE_ENV: process.env.NODE_ENV || "NOT SET",
      BUILD_TIME: process.env.BUILD_TIME || "NOT SET"
    };

    return NextResponse.json({
      environment: envVars,
      message: "Environment check complete"
    });
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message || String(error)
    }, { status: 500 });
  }
}
