import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import RecommendedItemsModal from "@/lib/models/RecommendedItemsModel";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    const logFile = path.join(process.cwd(), 'api_debug.log');
    const log = (msg: string) => {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logFile, `[${timestamp}] ${msg}\n`);
    };

    try {
        const { recomendedItem } = data;
        log('--- SEEDING recommendedItems ---');
        log(`Data source check: ${recomendedItem ? `Found ${recomendedItem.length} items` : 'NOT FOUND'}`);

        if (!recomendedItem) {
            throw new Error('recomendedItem not found in data source');
        }

        log('Connecting to DB...');
        await dbConnect();
        log('Database connected');

        log('Deleting old items...');
        await RecommendedItemsModal.deleteMany();
        log('Old items deleted');

        log('Inserting new items...');
        const result = await RecommendedItemsModal.insertMany(recomendedItem);
        log(`New items inserted: ${result.length}`);

        return NextResponse.json({
            message: 'Sended Successfuly',
            data: recomendedItem
        })
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        log(`ERROR: ${errorMsg}`);
        console.error('ERROR in recommendedItems/seed:', error);
        return NextResponse.json({
            message: 'Failed to seed recommendedItems',
            error: error.message || String(error)
        }, { status: 500 });
    }
}