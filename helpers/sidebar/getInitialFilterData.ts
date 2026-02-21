import { ProductProps } from "@/types";

/**
 * Extracts initial filter data (colors, brands, types, min/max prices) from the product list.
 */
export const getInitialFilterData = (constantList: ProductProps[]) => {
  const colorsMap = new Map<string, any>();
  const brandsMap = new Map<string, any>();
  const typesMap = new Map<string, any>();

  constantList.forEach((product) => {
    const colorKey = typeof product.color === 'string' ? product.color : product.color?.en || '';
    if (colorKey && !colorsMap.has(colorKey)) colorsMap.set(colorKey, product.color);

    const brandKey = typeof product.brand === 'string' ? product.brand : product.brand?.en || '';
    if (brandKey && !brandsMap.has(brandKey)) brandsMap.set(brandKey, product.brand);

    const typeKey = typeof product.type === 'string' ? product.type : product.type?.en || '';
    if (typeKey && !typesMap.has(typeKey)) typesMap.set(typeKey, product.type);
  });

  const prices = constantList.map((product: ProductProps) => product.price).filter(p => typeof p === 'number');

  const minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length ? Math.floor(Math.max(...prices)) : 2000;

  return {
    colors: Array.from(colorsMap.values()),
    brands: Array.from(brandsMap.values()),
    types: Array.from(typesMap.values()),
    minPrice,
    maxPrice
  };
};
