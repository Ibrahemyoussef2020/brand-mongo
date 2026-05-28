import dotenv from 'dotenv';

import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

interface CloudinaryImage {
    url: string;
    public_id: string;
}

dotenv.config({ path: '.env.local' });

const migrateImages = async () => {
    try {
        await dbConnect();

        console.log('Connected to database');

        const products = await ProductModel.find({});

        console.log(`Found ${products.length} products`);

        for (const product of products) {
            try {
                const oldImages = product.images;

                // skip if already migrated
                if (
                    oldImages?.length &&
                    typeof oldImages[0] === 'object' &&
                    oldImages[0].url
                ) {
                    console.log(`Skipped already migrated product: ${product._id}`);
                    continue;
                }

                const newImages: CloudinaryImage[] = [];

                if (!oldImages || oldImages.length) continue;

                for (const image of oldImages as string[]) {
                    try {
                        // remove starting slash if exists 
                        const cleanImagePath = image.startsWith('/')
                            ? image.slice(1)
                            : image;

                        // local image path
                        const fullImagePath = path.join(
                            process.cwd(),
                            'public',
                            cleanImagePath
                        );

                        // check if image exists
                        if (!fs.existsSync(fullImagePath)) {
                            console.log(`Image not found: ${fullImagePath}`);
                            continue;
                        }

                        console.log(`Uploading: ${fullImagePath}`);

                        // upload image
                        const uploaded = await cloudinary.uploader.upload(
                            fullImagePath,
                            {
                                folder: 'products',
                            }
                        );

                        newImages.push({
                            url: uploaded.secure_url,
                            public_id: uploaded.public_id,
                        });

                        console.log(`Uploaded: ${uploaded.public_id}`);

                    } catch (error) {
                        console.log('Single image upload failed:', error);
                    }
                }

                // update product images
                product.images = newImages;

                await product.save();

                console.log(`Updated product: ${product._id}`);

            } catch (error) {
                console.log('Product migration failed:', error);
            }
        }

        console.log('Migration completed successfully');

        process.exit(0);

    } catch (error) {
        console.log('Migration failed:', error);

        process.exit(1);
    }
};

migrateImages();