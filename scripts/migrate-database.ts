/**
 * Database Migration Script
 * This script helps migrate data from old database to new one
 */

import dbConnect from '../lib/dbConnect';
import ProductModel from '../lib/models/ProductModel';
import RecommendedItemsModal from '../lib/models/RecommendedItemsModel';
import HomeConsumerModel from '../lib/models/HomeConsumer';
import HomeOutdoorModel from '../lib/models/HomeOutdoorModel';
import DealOffersModel from '../lib/models/DealOffersModel';
import data from '../lib/data';

export async function migrateDatabase() {
  try {
    console.log('🔄 Starting database migration...');
    
    await dbConnect();
    
    // Check if data already exists
    const existingProducts = await ProductModel.countDocuments();
    const existingRecommended = await RecommendedItemsModal.countDocuments();
    
    console.log(`📊 Current database status:`);
    console.log(`   - Products: ${existingProducts}`);
    console.log(`   - Recommended Items: ${existingRecommended}`);
    
    if (existingProducts > 0) {
      console.log('✅ Database already contains data. Migration complete!');
      return { success: true, message: 'Database already populated' };
    }
    
    console.log('🌱 Seeding new database with initial data...');
    
    // Seed products
    if (data.products && data.products.length > 0) {
      await ProductModel.insertMany(data.products);
      console.log(`✅ Seeded ${data.products.length} products`);
    }
    
    // Seed recommended items
    if (data.recomendedItem && data.recomendedItem.length > 0) {
      await RecommendedItemsModal.insertMany(data.recomendedItem);
      console.log(`✅ Seeded ${data.recomendedItem.length} recommended items`);
    }
    
    // Seed other collections if they exist
    if (data.homeConsumer && data.homeConsumer.length > 0) {
      await HomeConsumerModel.insertMany(data.homeConsumer);
      console.log(`✅ Seeded ${data.homeConsumer.length} home consumer items`);
    }
    
    if (data.homeOutdoor && data.homeOutdoor.length > 0) {
      await HomeOutdoorModel.insertMany(data.homeOutdoor);
      console.log(`✅ Seeded ${data.homeOutdoor.length} home outdoor items`);
    }
    
    if (data.dealOffers && data.dealOffers.length > 0) {
      await DealOffersModel.insertMany(data.dealOffers);
      console.log(`✅ Seeded ${data.dealOffers.length} deal offers`);
    }
    
    console.log('🎉 Database migration completed successfully!');
    
    return { 
      success: true, 
      message: 'Database migration completed',
      seeded: {
        products: data.products?.length || 0,
        recommended: data.recomendedItem?.length || 0,
        homeConsumer: data.homeConsumer?.length || 0,
        homeOutdoor: data.homeOutdoor?.length || 0,
        dealOffers: data.dealOffers?.length || 0
      }
    };
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { 
      success: false, 
      message: 'Migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Run if this file is executed directly
if (require.main === module) {
  migrateDatabase()
    .then(result => {
      console.log('\n📋 Migration Result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Unexpected error:', error);
      process.exit(1);
    });
}
