import React from 'react';
import { FilterInputProps, FilterProps } from '@/types';

export const handleMinMaxPriceHelper = (
  e: React.ChangeEvent<HTMLInputElement>,
  minMax: string,
  setMinPriceValue: React.Dispatch<React.SetStateAction<number>>,
  setMaxPriceValue: React.Dispatch<React.SetStateAction<number>>
) => {
  if (minMax === 'min') {
    setMinPriceValue(+e.target.value);
  } else {
    setMaxPriceValue(+e.target.value);
  }
};

export const submitMinMixHelper = (
  minPriceValue: number,
  maxPriceValue: number,
  handleFilter: (filter: FilterProps, checked: boolean) => void
) => {
  handleFilter(
    {
      prop: 'price',
      type: 'minmax',
      min: minPriceValue,
      max: maxPriceValue,
    },
    true
  );
};
