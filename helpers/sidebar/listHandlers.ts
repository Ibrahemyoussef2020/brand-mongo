import React from 'react';
import { getUpdatedListValues } from './getUpdatedListValues'; // Import the existing helper
import { FilterInputProps, FilterProps } from '@/types';

export const handleFilterListHelper = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentValues: string[],
  prop: string,
  handleFilter: (filter: FilterProps, checked: boolean) => void,
  setFiltersClear: (filter: boolean) => void,
  setFilterRemove: (filter: FilterInputProps) => void
) => {
  const nextValues = getUpdatedListValues(currentValues, e.target.value, e.target.checked);

  handleFilter(
    {
      prop: prop,
      type: 'list',
      values: nextValues,
    },
    e.target.checked
  );

  setFiltersClear(false);
  setFilterRemove({ name: '', value: '' });
};
