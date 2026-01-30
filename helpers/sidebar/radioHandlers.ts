import React from 'react';
import { FilterInputProps, FilterProps } from '@/types';

export const handleRadioValuesHelper = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSelectedType: React.Dispatch<React.SetStateAction<string>>,
  handleFilter: (filter: FilterProps, checked: boolean) => void,
  setFiltersClear: (filter: boolean) => void,
  setFilterRemove: (filter: FilterInputProps) => void
) => {
  if (e.target.name === 'type') {
    setSelectedType(e.target.value);
  }

  const prop = `${e.target.name}`;

  handleFilter(
    {
      prop: prop,
      type: 'custom',
      value: e.target.value,
    },
    true
  );

  setFiltersClear(false);
  setFilterRemove({ name: '', value: '' });
};
