import dbConnect from "@/lib/dbConnect";
import { HomeSection } from "@/lib/models/HomeSection";
import ProductModel from "@/lib/models/ProductModel";
import { withRetry } from "./withRetry";

export const getHomeSections = async () => {
  try {
    // Skip database only during build to prevent failures
    if (process.env.BUILD_TIME === 'true') {
      return [];
    }
    
    // Dynamically generate sections from db.ts data
    const { products } = await import('@/db');
    
    let sections = [];
    
    // Check if we have deal offers data and create section dynamically
    const dealOffers = products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('deal-'));
    if (dealOffers.length > 0) {
      sections.push({
        key: 'deal-offers',
        type: 'DEAL_OFFERS',
        title: { en: 'Deal Offers', ar: ' ofertas especiales' },
        config: {
          showTimer: true,
          endAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        },
        products: [] // Empty - component will fetch via API
      });
    }
    
    // Check if we have home consumer data and create section dynamically
    const homeConsumer = products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('consumer-'));
    if (homeConsumer.length > 0) {
      sections.push({
        key: 'home-consumer',
        type: 'GRID_SECTION',
        title: { en: 'Home Consumer', ar: ' products for home' },
        config: {
          layout: { columns: 5 }
        },
        products: [] // Empty - component will fetch via API
      });
    }
    
    // Check if we have home outdoor data and create section dynamically
    const homeOutdoor = products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('home-'));
    if (homeOutdoor.length > 0) {
      sections.push({
        key: 'home-outdoor',
        type: 'GRID_SECTION',
        title: { en: 'Home Outdoor', ar: ' outdoor products' },
        config: {
          layout: { columns: 5 }
        },
        products: [] // Empty - component will fetch via API
      });
    }
    
    // Check if we have recommended items and create section dynamically
    const recommendedItems = products.filter(p => p.to_home === true);
    if (recommendedItems.length > 0) {
      sections.push({
        key: 'recommended-items',
        type: 'GRID_SECTION',
        title: { en: 'Recommended Items', ar: ' recommended' },
        config: {
          layout: { columns: 5 }
        },
        products: [] // Empty - component will fetch via API
      });
    }
    
    console.log(`Dynamically created ${sections.length} sections based on available data`);
    return sections;
  } catch (error: any) {
    console.error('Error in getHomeSections:', error);
    return [];
  }
};
