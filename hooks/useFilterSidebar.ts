import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { FilterInputProps, FilterProps, FilterSidebarProps } from '@/types';
import { 
  getInitialFilterData, 
  getNewVisibleSections, 
  getUpdatedListValues, 
  handleMinMaxPriceHelper,
  submitMinMixHelper,
  handleBooleanValuesHelper,
  handleRadioValuesHelper,
  handleFilterListHelper,
  handleUnCheckInputHelper,
  handleRemoveFilterHelper,
  handleClearFiltersHelper
} from '@/helpers/sidebar';

export const useFilterSidebar = (props: FilterSidebarProps) => {
  const {
    handleFilter,
    selectedValue,
    constantList,
    filtersClear,
    setFiltersClear,
    filterRemove,
    setFilterRemove,
    filterSelectedList,
  } = props;

  const brandValues = filterSelectedList.find((f) => f.prop === 'brand')?.values || [];
  const ratingValues = filterSelectedList.find((f) => f.prop === 'avgRating')?.values || [];
  const typeValue = filterSelectedList.find((f) => f.prop === 'type')?.value || '';
  const colorValue = filterSelectedList.find((f) => f.prop === 'color')?.value || '';
  const isPremium = filterSelectedList.find((f) => f.prop === 'premium_offer')?.checked || false;
  const isFreeDelivery = filterSelectedList.find((f) => f.prop === 'free_delivery')?.checked || false;
  const isToHome = filterSelectedList.find((f) => f.prop === 'to_home')?.checked || false;
  const priceFilter = filterSelectedList.find((f) => f.prop === 'price');

  const [minPriceFromData, setMinPriceFromData] = useState<number>(0);
  const [maxPriceFromData, setMaxPriceFromData] = useState<number>(2000);

  const [minPriceValue, setMinPriceValue] = useState<number>(minPriceFromData);
  const [maxPriceValue, setMaxPriceValue] = useState<number>(maxPriceFromData);

  const [visibleSection, setVisibleSection] = useState([
    'category',
    'brand',
    'features',
    'price',
    'color',
    'rating',
  ]);

  const [productsColor, setProductsColor] = useState<string[] | []>([]);
  const [productsBrand, setProductsBrand] = useState<string[] | []>([]);
  const [productsType, setProductsType] = useState<string[] | []>([]);

  const [selectedType, setSelectedType] = useState<string>('');

  const ref_premium_offer = useRef<HTMLInputElement[]>([]);
  const ref_free_delivery = useRef<HTMLInputElement[]>([]);
  const ref_to_home = useRef<HTMLInputElement[]>([]);

  const ref_typeEls = useRef<HTMLInputElement[]>([]);
  const ref_ratingEls = useRef<HTMLInputElement[]>([]);
  const ref_brandEls = useRef<HTMLInputElement[]>([]);
  const ref_colorEls = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const { colors, brands, types, minPrice, maxPrice } = getInitialFilterData(constantList);

    setProductsColor(colors);
    setProductsBrand(brands);
    setProductsType(types);
    setMinPriceFromData(minPrice);
    setMaxPriceFromData(maxPrice);
  }, [constantList]);

  useEffect(() => {
    if (filterRemove.name !== '') {
      handleUnCheckInput(filterRemove);
    }

    if (filtersClear) {
      handleClearFilters();
    }
  }, [filterRemove, filtersClear]);

  useEffect(() => {
    if (priceFilter) {
      if (priceFilter.min !== undefined) setMinPriceValue(priceFilter.min);
      if (priceFilter.max !== undefined) setMaxPriceValue(priceFilter.max);
    }
  }, [priceFilter]);

  //________________ Wrappers for Helpers _______________________//

  const handleMinMaxPrice = (e: React.ChangeEvent<HTMLInputElement>, minMax: string) => {
    handleMinMaxPriceHelper(e, minMax, setMinPriceValue, setMaxPriceValue);
  };

  const submitMinMix = () => {
    submitMinMixHelper(minPriceValue, maxPriceValue, handleFilter);
  };

  const handleBooleanValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleBooleanValuesHelper(e, handleFilter, setFiltersClear, setFilterRemove);
  };

  const handleRadioValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRadioValuesHelper(e, setSelectedType, handleFilter, setFiltersClear, setFilterRemove);
  };

  const handleFilterBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterListHelper(e, brandValues, 'brand', handleFilter, setFiltersClear, setFilterRemove);
  };

  const handleFilterRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterListHelper(e, ratingValues, 'avgRating', handleFilter, setFiltersClear, setFilterRemove);
  };

  const handleUnCheckInput = (filter: FilterInputProps) => {
    const refMap = {
      premium_offer: ref_premium_offer,
      free_delivery: ref_free_delivery,
      to_home: ref_to_home,
      type: ref_typeEls,
      avgRating: ref_ratingEls,
      brand: ref_brandEls,
      color: ref_colorEls,
    };

    const currentData = {
      brandValues,
      ratingValues,
      minPriceValue,
      maxPriceValue,
      minPriceFromData,
      maxPriceFromData,
    };

    handleUnCheckInputHelper(filter, refMap as any, currentData, handleFilter, setFiltersClear, setFilterRemove);
  };

  const handleRemoveFilter = (filter: string) => {
    const refMap = {
      premium_offer: ref_premium_offer,
      free_delivery: ref_free_delivery,
      to_home: ref_to_home,
      type: ref_typeEls,
      avgRating: ref_ratingEls,
      brand: ref_brandEls,
      color: ref_colorEls,
    };
    
    handleRemoveFilterHelper(filter, refMap as any, handleFilter, setFiltersClear, setFilterRemove);
  };

  const handleClearFilters = () => {
    const refMap = {
      premium_offer: ref_premium_offer,
      free_delivery: ref_free_delivery,
      to_home: ref_to_home,
      type: ref_typeEls,
      avgRating: ref_ratingEls,
      brand: ref_brandEls,
      color: ref_colorEls,
    };

    handleClearFiltersHelper(filtersClear, refMap as any, handleFilter, setFiltersClear, setFilterRemove);
  };

  const toggleArrowDrop = (value: string) => {
    const list = getNewVisibleSections(visibleSection, value);
    setVisibleSection(list);
  };

  return {
    minPriceFromData,
    maxPriceFromData,
    minPriceValue,
    maxPriceValue,
    visibleSection,
    productsColor,
    productsBrand,
    productsType,
    selectedType,
    brandValues,
    ratingValues,
    typeValue,
    colorValue,
    isPremium,
    isFreeDelivery,
    isToHome,
    handleMinMaxPrice,
    submitMinMix,
    handleBooleanValues,
    handleRadioValues,
    handleFilterBrand,
    handleFilterRating,
    handleRemoveFilter,
    toggleArrowDrop,
    ref_premium_offer,
    ref_free_delivery,
    ref_to_home,
    ref_typeEls,
    ref_ratingEls,
    ref_brandEls,
    ref_colorEls,
  };
};
