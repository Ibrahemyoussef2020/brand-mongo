import React from 'react';
import { FilterInputProps, FilterProps } from '@/types';

export const handleBooleanValuesHelper = (
  e: React.ChangeEvent<HTMLInputElement>,
  handleFilter: (filter: FilterProps, checked: boolean) => void,
  setFiltersClear: (filter: boolean) => void,
  setFilterRemove: (filter: FilterInputProps) => void
) => {
  const prop = e.target.name;

  handleFilter(
    {
      prop: prop,
      type: 'boolean',
      checked: e.target.checked,
    },
    e.target.checked
  );

  setFiltersClear(false);
  setFilterRemove({ name: '', value: '' });
};
