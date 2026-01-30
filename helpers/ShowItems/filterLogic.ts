import { FilterProps } from "@/types";

export const getUpdatedFilterList = (
  currentFilters: FilterProps[],
  filterData: FilterProps,
  isAdded: boolean
): FilterProps[] => {
  let updatedFilters = [...currentFilters];

  // ✅ 1. Clear all filters
  if (filterData.type === "clear") {
    updatedFilters = [];
  }
  // ✅ 2. Remove a specific filter
  else if (filterData.type === "remove-filter") {
    updatedFilters = updatedFilters.filter((filter) => filter.prop !== filterData.prop);
  }
  // ✅ 3. Adding or updating a filter
  else if (isAdded) {
    const existingFilterIndex = updatedFilters.findIndex((filter) => filter.prop === filterData.prop);

    if (existingFilterIndex !== -1) {
      updatedFilters[existingFilterIndex] = filterData; // Modify existing filter
    } else {
      updatedFilters.push(filterData); // Add new filter
    }
  } else {
    // ✅ 4. Removing a filter when unchecked
    if (filterData.type === "list") {
      const newValues = filterData.values || [];
      if (newValues.length > 0) {
        updatedFilters = updatedFilters.map((filter) =>
          filter.prop === filterData.prop ? { ...filter, values: newValues } : filter
        );
      } else {
        updatedFilters = updatedFilters.filter((filter) => filter.prop !== filterData.prop);
      }
    } else {
      updatedFilters = updatedFilters.filter((filter) => filter.prop !== filterData.prop);
    }
  }

  return updatedFilters;
};
