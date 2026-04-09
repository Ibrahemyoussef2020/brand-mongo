import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from '../lib/models/ProductModel';

dotenv.config({ path: '.env' });

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const products = await ProductModel.find({ "category.en": "headphones" }).lean();
    console.log(products.map(p => ({ title: p.title?.en, image: p.image })));
    process.exit(0);
}

run();
