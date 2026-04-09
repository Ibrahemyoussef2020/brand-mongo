import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from '../lib/models/ProductModel';

dotenv.config({ path: '.env' });
mongoose.connect(process.env.MONGODB_URI as string).then(async () => {
    const products = await ProductModel.find({'category.en': 'headphones'});
    for (const p of products) {
        if (p.image && p.image.includes('headohone')) {
            p.image = p.image.replace('headohone', 'headphones');
            await p.save();
        } else if (p.image && p.image.includes('headphone-')) {
            p.image = p.image.replace('headphone-', 'headphones-');
            await p.save();
        }
    }
    console.log("Fixed typos.");
    process.exit(0);
});
