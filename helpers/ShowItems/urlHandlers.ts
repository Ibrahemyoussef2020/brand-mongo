import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FilterProps } from "@/types";

export const updateURLHelper = (
  router: AppRouterInstance,
  pathname: string,
  filters: FilterProps[],
  currentSort?: string,
  currentDesign?: string
) => {
  const params = new URLSearchParams();

  filters.forEach((filter) => {
    if (filter.type === "list" && filter.values) {
      filter.values.forEach((v) => params.append(filter.prop, v));
    } else if (filter.type === "minmax") {
      if (filter.min !== undefined) params.set(`${filter.prop}_min`, filter.min.toString());
      if (filter.max !== undefined) params.set(`${filter.prop}_max`, filter.max.toString());
    } else if (filter.type === "boolean" || filter.type === "custom") {
      const val = filter.checked ?? filter.value;
      if (val !== undefined && val !== false) params.set(filter.prop, val.toString());
    }
  });

  if (currentSort && currentSort !== '#') params.set('sort', currentSort);
  if (currentDesign) params.set('design', currentDesign);

  const queryString = params.toString();
  router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
};
