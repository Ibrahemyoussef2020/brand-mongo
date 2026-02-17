import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import DealOffersModel from "@/lib/models/DealOffersModel";
import HomeConsumerModel from "@/lib/models/HomeConsumer";
import HomeOutdoorModel from "@/lib/models/HomeOutdoorModel";
import RecommendedItemsModel from "@/lib/models/RecommendedItemsModel";
import FlagModel from "@/lib/models/FlagsModel";
import UserModel from "@/lib/models/UserModel";
import data from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const force = searchParams.get('force') === 'true';

    // If not force, just return a message or handle differently.
    // But usually a seed route is meant to seed.
    
    // 1. Seed Products
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(data.products);

    // 2. Seed Deal Offers
    await DealOffersModel.deleteMany({});
    await DealOffersModel.insertMany(data.dealOffers);

    // 3. Seed Home Outdoor
    await HomeOutdoorModel.deleteMany({});
    await HomeOutdoorModel.insertMany(data.homeOutdoor);

    // 4. Seed Home Consumer
    await HomeConsumerModel.deleteMany({});
    await HomeConsumerModel.insertMany(data.homeConsumer);

    // 5. Seed Recommended Items
    await RecommendedItemsModel.deleteMany({});
    await RecommendedItemsModel.insertMany(data.recomendedItem);

    // 6. Seed Flags
    await FlagModel.deleteMany({});
    await FlagModel.insertMany(data.flags);

    // 7. Seed Users (Optional/Force)
    if (force) {
        await UserModel.deleteMany({});
        await UserModel.insertMany(data.users);
    }

    return NextResponse.json({ 
        message: "Database seeded successfully with localized data",
        stats: {
            products: data.products.length,
            dealOffers: data.dealOffers.length,
            homeOutdoor: data.homeOutdoor.length,
            homeConsumer: data.homeConsumer.length,
            recommendedItems: data.recomendedItem.length,
            flags: data.flags.length,
            users: force ? data.users.length : "skipped"
        }
    });
  } catch (error: any) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ message: "Failed to seed database", error: error.message }, { status: 500 });
  }
}
