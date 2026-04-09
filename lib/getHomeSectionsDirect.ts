import { products } from "@/db";
import { HomeSectionType } from "@/lib/constants/homeSectionTypes";

export const getHomeSectionsDirect = async () => {
  try {
    console.log('Getting home sections directly from db.ts...');
    
    // Define sections based on your data structure
    const sections = [
      {
        key: 'deal-offers',
        type: HomeSectionType.DEAL_OFFERS,
        title: { en: 'Deal Offers', ar: ' ofertas especiales' },
        config: {
          showTimer: true,
          endAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        },
        products: products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('deal-'))
      },
      {
        key: 'home-consumer',
        type: HomeSectionType.GRID_SECTION,
        title: { en: 'Home Consumer', ar: ' products for home' },
        config: {
          layout: { columns: 5 }
        },
        products: products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('consumer-'))
      },
      {
        key: 'home-outdoor',
        type: HomeSectionType.GRID_SECTION,
        title: { en: 'Home Outdoor', ar: ' outdoor products' },
        config: {
          layout: { columns: 5 }
        },
        products: products.filter(p => typeof p.static_id === 'string' && p.static_id.startsWith('home-'))
      },
      {
        key: 'recommended-items',
        type: HomeSectionType.GRID_SECTION,
        title: { en: 'Recommended Items', ar: ' recommended' },
        config: {
          layout: { columns: 5 }
        },
        products: products.filter(p => p.to_home === true)
      }
    ];
    
    console.log(`Found ${sections.length} sections with data:`, sections.map(s => ({ key: s.key, count: s.products.length })));
    
    return sections;
  } catch (error) {
    console.error('Error getting home sections directly:', error);
    return [];
  }
};
