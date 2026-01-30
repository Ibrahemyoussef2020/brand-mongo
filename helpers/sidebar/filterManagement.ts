import { MutableRefObject } from 'react';
import { FilterInputProps, FilterProps } from '@/types';
import { resetFilterRefs } from './resetFilterRefs';
import { getUncheckFilterAction } from './getUncheckFilterAction';

interface CurrentFilterData {
  brandValues: string[];
  ratingValues: string[];
  minPriceValue: number;
  maxPriceValue: number;
  minPriceFromData: number;
  maxPriceFromData: number;
}

export const handleUnCheckInputHelper = (
  filter: FilterInputProps,
  refMap: Record<string, MutableRefObject<HTMLInputElement[] | null>>,
  currentData: CurrentFilterData,
  handleFilter: (filter: FilterProps, checked: boolean) => void,
  setFiltersClear: (filter: boolean) => void,
  setFilterRemove: (filter: FilterInputProps) => void
) => {
  const prop = filter.name;

  // We need to cast refMap slightly because resetFilterRefs expects MutableRefObject<HTMLInputElement[]> 
  // but here we might have refs that could be null initialized (though usually they are arrays).
  // Assuming resetFilterRefs handles it or we pass it correctly.
  
  resetFilterRefs(refMap as any, prop);

  const updatedFilter = getUncheckFilterAction(prop, filter.value, currentData);

  if (updatedFilter) {
    handleFilter(updatedFilter, false);
  }

  setFiltersClear(false);
  setFilterRemove({ name: '', value: '' });
};

export const handleRemoveFilterHelper = (
  filter: string,
  refMap: Record<string, MutableRefObject<HTMLInputElement[] | null>>,
  handleFilter: (filter: FilterProps, checked: boolean) => void,
  setFiltersClear: (filter: boolean) => void,
  setFilterRemove: (filter: FilterInputProps) => void
) => {
  resetFilterRefs(refMap as any, filter);

  const updatedFilter: FilterProps = {
    prop: filter,
    type: 'remove-filter',
  };

  handleFilter(updatedFilter, false);

  setFiltersClear(false);
  setFilterRemove({ name: '', value: '' });
};

export const handleClearFiltersHelper = (
  filtersClear: boolean,
  refMap: Record<string, MutableRefObject<HTMLInputElement[] | null>>,
  handleFilter: (filter: FilterProps, checked: boolean) => void,
  setFiltersClear: (filter: boolean) => void,
  setFilterRemove: (filter: FilterInputProps) => void
) => {
  if (filtersClear) {
    resetFilterRefs(refMap as any);

    const updatedFilter: FilterProps = {
      prop: '',
      type: 'clear',
    };

    handleFilter(updatedFilter, false);

    setFiltersClear(false);
    setFilterRemove({ name: '', value: '' });
  }
};
