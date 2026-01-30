import { FilterProps } from '@/types';

/**
 * Determines the next filter action when an input is unchecked.
 * @param prop The property name of the filter (e.g., 'brand', 'price')
 * @param value The value being unchecked
 * @param currentValues Current state values needed for calculation (brandValues, ratingValues, etc.)
 * @returns FilterProps object describing the update, or null if no update needed
 */
interface CurrentValues {
  brandValues: string[];
  ratingValues: string[];
  minPriceValue: number;
  maxPriceValue: number;
  minPriceFromData: number;
  maxPriceFromData: number;
}

export const getUncheckFilterAction = (
  prop: string,
  value: string,
  currentValues: CurrentValues
): FilterProps | null => {
  let updatedFilter: FilterProps | null = null;

  if (["premium_offer", "free_delivery", "to_home", "verified"].includes(prop)) {
    updatedFilter = { prop, type: "boolean", checked: false };
  } else if (["type", "color"].includes(prop)) {
    updatedFilter = { prop, type: "custom", value: value };
    
  } else if (prop === "brand") {
    const nextBrandValues = currentValues.brandValues.filter((brand) => brand !== value);
    updatedFilter = { prop, type: "list", values: nextBrandValues };
  } else if (prop === "avgRating") {
    const nextRatingValues = currentValues.ratingValues.filter((rate) => rate !== value);
    updatedFilter = { prop, type: "list", values: nextRatingValues };
  } else if (prop === "price") {
    const valToRemove = Number(value);
    let newMin = currentValues.minPriceValue;
    let newMax = currentValues.maxPriceValue;

    if (valToRemove === currentValues.minPriceValue) {
      newMin = currentValues.minPriceFromData;
    }
    
    if (valToRemove === currentValues.maxPriceValue) {
      newMax = currentValues.maxPriceFromData;
    }

    updatedFilter = { prop, type: "minmax", min: newMin, max: newMax };
  }

  return updatedFilter;
};
