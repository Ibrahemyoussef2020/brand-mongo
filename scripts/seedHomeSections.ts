import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HomeSection } from '../lib/models/HomeSection';
import { HomeSectionType } from '../lib/constants/homeSectionTypes';
import ProductModel from '../lib/models/ProductModel';

dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const seedSections = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const args = process.argv.slice(2);
    const reset = args.includes('--reset');

    if (reset) {
        console.log('Resetting home sections...');
        await HomeSection.deleteMany({});
    }

    // Prepare exactly like before sections
    const dealsProducts = await ProductModel.find({ "category.en": "deals" }).limit(10).select('_id static_id').lean();
    const recommendedProducts = await ProductModel.find({ "category.en": "recommended" }).limit(10).select('_id static_id').lean(); // or some generic
    const outdoorProducts = await ProductModel.find({ "category.en": "homeOutdoor" }).limit(6).lean();
    const consumerProducts = await ProductModel.find({ "category.en": "homeConsumer" }).limit(6).lean();

    const sections = [
        {
            key: 'home-offers',
            type: HomeSectionType.DEAL_OFFERS,
            status: 'published',
            title: { en: 'Deals and offers', ar: 'عروض وصفقات' },
            subtitle: { en: 'Hygiene equipments', ar: 'معدات النظافة' },
            order: 1,
            enabled: true,
            config: {
                endAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
                badgeText: '-25%'
            },
            itemsSource: {
                mode: 'query',
                categoryId: 'deals',
                limit: 10
            }
        },
        {
            key: 'home-outer',
            type: HomeSectionType.INLINE_START_IMAGE,
            status: 'published',
            title: { en: 'Home and outdoor', ar: 'المنزل والخارج' },
            order: 2,
            enabled: true,
            config: {
                heroImage: '/images/home-outer.webp',
                buttonText: 'Source now',
                buttonHref: '/showCategories/homeOutdoor'
            },
            itemsSource: { 
                mode: 'query',
                categoryId: 'chairs', // Fetch real products
                limit: 100
            }
        },
        {
            key: 'electronics',
            type: HomeSectionType.INLINE_START_IMAGE,
            status: 'published',
            title: { en: 'Consumer electronics and gadgets', ar: 'الإلكترونيات الاستهلاكية' },
            order: 3,
            enabled: true,
            config: {
                heroImage: '/images/consumer-electronics.webp',
                buttonText: 'Source now',
                buttonHref: '/showCategories/homeConsumer'
            },
            itemsSource: { 
                mode: 'query',
                categoryId: 'headphones', // Fetch real products
                limit: 100
            }
        },
        {
            key: 'recommended-items',
            type: HomeSectionType.GRID_SECTION,
            status: 'published',
            title: { en: 'Recommended items', ar: 'العناصر الموصى بها' },
            order: 4,
            enabled: true,
            config: {
                layout: { columns: 5 },
                showPrice: true,
                showRating: true
            },
            itemsSource: {
                mode: 'query',
                categoryId: 'kitchen-tools', // Using this to grab some products or any category
                limit: 10
            }
        }
    ];

    for (const section of sections) {
        await HomeSection.findOneAndUpdate(
            { key: section.key },
            { $set: section },
            { upsert: true, new: true, runValidators: true }
        );
        console.log(`Upserted section: ${section.key}`);
    }

    console.log('Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedSections();
