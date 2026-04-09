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
    
    // Return mock sections to allow components to render and make their own API calls
    return [
      {
        key: 'deal-offers',
        type: 'DEAL_OFFERS',
        title: { en: 'Deal Offers', ar: ' ofertas especiales' },
        config: {
          showTimer: true,
          endAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        },
        products: [] // Empty - component will fetch via API
      },
      {
        key: 'home-consumer',
        type: 'GRID_SECTION',
        title: { en: 'Home Consumer', ar: ' products for home' },
        config: {
          layout: { columns: 5 }
        },
        products: [] // Empty - component will fetch via API
      },
      {
        key: 'home-outdoor',
        type: 'GRID_SECTION',
        title: { en: 'Home Outdoor', ar: ' outdoor products' },
        config: {
          layout: { columns: 5 }
        },
        products: [] // Empty - component will fetch via API
      },
      {
        key: 'recommended-items',
        type: 'GRID_SECTION',
        title: { en: 'Recommended Items', ar: ' recommended' },
        config: {
          layout: { columns: 5 }
        },
        products: [] // Empty - component will fetch via API
      }
    ];
    
    await withRetry(() => dbConnect(), { timeout: 10000 });

    // Get all sections first with retry
    let sections = await withRetry(
      () => HomeSection.find({ enabled: true, status: 'published' })
        .sort({ order: 1 })
        .lean(),
      { timeout: 15000 }
    );

    // Collect all manual product IDs for batch fetching
    const manualSections = sections.filter(section => 
      section.itemsSource && 
      section.itemsSource.mode === 'manual' && 
      section.itemsSource.productIds && 
      section.itemsSource.productIds.length > 0
    );

    const allManualProductIds = manualSections.flatMap(section => section.itemsSource.productIds);
    
    // Batch fetch all manual products in ONE query with retry
    let allManualProducts: any[] = [];
    if (allManualProductIds.length > 0) {
      allManualProducts = await withRetry(
        () => ProductModel.find({
          _id: { $in: allManualProductIds }
        })
        .select('_id static_id title image price oldPrice badge discount ratings free_delivery to_home')
        .lean(),
        { timeout: 20000 }
      );
    }

    // Collect all query sections for batch processing
    const querySections = sections.filter(section => 
      section.itemsSource && 
      section.itemsSource.mode === 'query'
    );

    // Batch process query sections
    const queryResults = await Promise.all(querySections.map(async (section) => {
      const query: any = {};
      if (section.itemsSource.categoryId) {
           query['category.en'] = section.itemsSource.categoryId;
      }
      if (section.itemsSource.collectionId) {
           query['type.en'] = section.itemsSource.collectionId;
      }
      
      let mongoQuery = ProductModel.find(query);
      
      if (section.itemsSource.sort === 'newest') mongoQuery = mongoQuery.sort({ createdAt: -1 });
      else if (section.itemsSource.sort === 'priceLow') mongoQuery = mongoQuery.sort({ price: 1 });
      else if (section.itemsSource.sort === 'priceHigh') mongoQuery = mongoQuery.sort({ price: -1 });
      else if (section.itemsSource.sort === 'topRated') mongoQuery = mongoQuery.sort({ ratings: -1 });

      const limit = section.itemsSource.limit || 10;
      mongoQuery = mongoQuery.limit(limit);

      const products = await mongoQuery.select('_id static_id title image price oldPrice badge discount ratings free_delivery to_home').lean();
      
      return { sectionKey: section.key, products };
    }));

    // Process sections with fetched data
    sections = sections.map((section: any) => {
      if (section.itemsSource && section.itemsSource.mode === 'manual' && section.itemsSource.productIds) {
        // Map products back to section
        const populatedProducts = section.itemsSource.productIds.map((id: any) => 
          allManualProducts.find((p: any) => p._id.toString() === id.toString())
        ).filter(Boolean);
        
        section.products = populatedProducts;
      } else if (section.itemsSource && section.itemsSource.mode === 'query') {
        // Get products from query results
        const queryResult = queryResults.find(qr => qr.sectionKey === section.key);
        section.products = queryResult ? queryResult.products : [];
      }
      return section;
    });

    return sections; // No JSON.parse needed - .lean() returns plain objects
  } catch (error) {
    console.error("Failed to fetch home sections:", error);
    return [];
  }
};
