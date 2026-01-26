import { ProductProps } from "@/types";

/**
 * Extracts initial filter data (colors, brands, types, min/max prices) from the product list.
 */
export const getInitialFilterData = (constantList: ProductProps[]) => {
  const colors = new Set(constantList.map((product: ProductProps) => product.color));
  const brands = new Set(constantList.map((product) => product.brand));
  const types = new Set(constantList.map((product) => product.type));
  const prices = constantList.map((product: ProductProps) => product.price);

  const minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length ? Math.floor(Math.max(...prices)) : 2000;

  return {
    colors: [...colors],
    brands: [...brands],
    types: [...types],
    minPrice,
    maxPrice
  };
};
