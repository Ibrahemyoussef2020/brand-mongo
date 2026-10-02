import { HomeSectionType } from '@/lib/constants/homeSectionTypes';
import { unstable_cache } from 'next/cache';

const fetchHomeSectionsData = async () => {
  try {
    if (process.env.BUILD_TIME === 'true') {
      return [];
    }

    const { products } = await import('@/db');
    let sections = [];

    // 1. Home Cover
    sections.push({ key: 'static-home-cover', type: 'STATIC_HOME_COVER', sortOrder: 1, products: [] });

    // 2. Consumer Electronics (GRID_SECTION)
    const homeConsumer = products.filter((p: any) => typeof p.static_id === 'string' && p.static_id.startsWith('consumer-'));
    if (homeConsumer.length > 0) {
      sections.push({
        key: 'home-consumer',
        type: 'GRID_SECTION',
        title: { en: 'Home Consumer', ar: 'إلكترونيات وأجهزة منزلية' },
        sortOrder: 2,
        config: { displayType: 'two-line', actionButtonType: 'show-details', layout: { columns: 5 } },
        products: homeConsumer
      });
    }

    // 3. Home Outdoor (GRID_SECTION)
    const homeOutdoor = products.filter((p: any) => typeof p.static_id === 'string' && p.static_id.startsWith('home-'));
    if (homeOutdoor.length > 0) {
      sections.push({
        key: 'home-outdoor',
        type: 'GRID_SECTION',
        title: { en: 'Home Outdoor', ar: 'المنزل والمنتجات الخارجية' },
        sortOrder: 3,
        config: { displayType: 'one-line', actionButtonType: 'add-to-fav', layout: { columns: 5 } },
        products: homeOutdoor
      });
    }

    // 4. Easy Request
    sections.push({ key: 'static-easy-request', type: 'STATIC_EASY_REQUEST', sortOrder: 4, products: [] });

    // 5. Recommended Items (GRID_SECTION)
    const recommendedItems = products.filter((p: any) => p.to_home === true);
    if (recommendedItems.length > 0) {
      sections.push({
        key: 'recommended-items',
        type: 'GRID_SECTION',
        title: { en: 'Recommended Items', ar: 'المنتجات الموصى بها' },
        sortOrder: 5,
        config: { displayType: 'grid', actionButtonType: 'add-to-cart', layout: { columns: 5 } },
        products: recommendedItems.slice(0, 10)
      });
    }

    // 6. Deal Offers
    const dealOffers = products.filter((p: any) => typeof p.static_id === 'string' && p.static_id.startsWith('deal-'));
    if (dealOffers.length > 0) {
      sections.push({
        key: 'deal-offers',
        type: 'DEAL_OFFERS',
        title: { en: 'Deal Offers', ar: 'العروض والخصومات' },
        sortOrder: 6,
        config: { displayType: 'deal-slider', actionButtonType: 'show-details', showTimer: true, endAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
        products: dealOffers
      });
    }

    // 7. Recommended Items 2 (GRID_SECTION)
    if (recommendedItems.length > 10) {
      sections.push({
        key: 'recommended-items-2',
        type: 'GRID_SECTION',
        title: { en: 'More Recommended Items', ar: 'المزيد من الموصى به' },
        sortOrder: 7,
        config: { displayType: 'grid', actionButtonType: 'add-to-cart', layout: { columns: 5 } },
        products: recommendedItems.slice(10, 20)
      });
    }

    // 8. Subscribe
    sections.push({ key: 'static-subscribe', type: 'STATIC_SUBSCRIBE', sortOrder: 8, products: [] });

    // 9. Suppliers
    sections.push({ key: 'static-suppliers', type: 'STATIC_SUPPLIERS', sortOrder: 9, products: [] });

    // 10. Extra Services
    sections.push({ key: 'static-extra-services', type: 'STATIC_EXTRA_SERVICES', sortOrder: 10, products: [] });

    sections.sort((a, b) => a.sortOrder - b.sortOrder);
    return sections;
  } catch (error: any) {
    console.error('Error in getHomeSections:', error);
    return [];
  }
};

export const getHomeSections = unstable_cache(
  fetchHomeSectionsData,
  ['home-sections-payload'],
  { revalidate: 120, tags: ['home-sections'] }
);

