import { FilterProps } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const parseSearchParamsHelper = (searchParams: URLSearchParams | ReadonlyURLSearchParams): FilterProps[] => {
  const filters: FilterProps[] = [];
  const groupedParams: Record<string, string[]> = {};
  
  searchParams.forEach((value, key) => {
    if (!groupedParams[key]) groupedParams[key] = [];
    groupedParams[key].push(value);
  });

  const listProps = ['brand', 'avgRating'];
  const booleanProps = ['premium_offer', 'free_delivery', 'to_home', 'verified'];
  const nonFilterParams = ['sort', 'design'];

  Object.entries(groupedParams).forEach(([key, values]) => {
    if (nonFilterParams.includes(key)) return;

    if (key.endsWith('_min') || key.endsWith('_max')) {
      const baseProp = key.replace(/_(min|max)$/, '');
      let filter = filters.find(f => f.prop === baseProp && f.type === 'minmax');
      if (!filter) {
        filter = { prop: baseProp, type: 'minmax' };
        filters.push(filter);
      }
      if (key.endsWith('_min')) filter.min = Number(values[0]);
      if (key.endsWith('_max')) filter.max = Number(values[0]);
    } else if (listProps.includes(key)) {
      filters.push({ prop: key, type: 'list', values });
    } else if (booleanProps.includes(key)) {
      filters.push({ prop: key, type: 'boolean', checked: values[0] === 'true' });
    } else {
      filters.push({ prop: key, type: 'custom', value: values[0] });
    }
  });

  return filters;
};

export const buildQueryStringHelper = (filters: FilterProps[]): string => {
  return filters
    .flatMap((filter) => {
      if (filter.type === "list") {
        return filter.values?.map((value) => `${filter.prop}=${encodeURIComponent(value)}`) || [];
      }
      if (filter.type === "minmax") {
        return [
          filter.min !== undefined ? `${filter.prop}_min=${filter.min}` : "",
          filter.max !== undefined ? `${filter.prop}_max=${filter.max}` : "",
        ].filter(Boolean);
      }
      if (filter.type === "boolean" || filter.type === "custom") {
        return `${filter.prop}=${filter.checked ?? filter.value}`;
      }
      return "";
    })
    .join("&");
};
