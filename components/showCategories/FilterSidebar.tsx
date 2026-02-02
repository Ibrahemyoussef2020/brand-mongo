'use client'

import React from 'react'
import { FilterSidebarProps } from '@/types';
import { useFilterSidebar } from '@/hooks/useFilterSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {toggleMobileAsideFilter} from '@/redux/slices';
import { AppDispatch, IRootState } from '@/redux/store';
import FilterTrack from './sidebarfilters/FilterTrack';
import FilterBoolean from './sidebarfilters/FilterBoolean';
import FilterList from './sidebarfilters/FilterList';
import FilterCustom from './sidebarfilters/FilterCustom';




interface StringProductProps{ 
  [name:string]:string
}

interface BooleanProductProps{
  [name:string]:boolean
}


const FilterSidebar = (props:FilterSidebarProps) => {
  const {
  selectedValue,
  } = props;


  const dispatch =useDispatch<AppDispatch>();
  const {isOppend } =  useSelector((state:IRootState)=> state.combine.asideFilter)

  const {
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
  } = useFilterSidebar(props);

 
    return (
      <aside className={`filter-aside ${isOppend ? 'open' : 'closed'}`}>
  
        <button className={`close`} onClick={_=>dispatch(toggleMobileAsideFilter(false))}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
  {/***********************  category  ************************** */}
  
        <FilterCustom
          section="category"
          visibleSection={visibleSection}
          toggleArrowDrop={toggleArrowDrop}
          handleRemoveFilter={handleRemoveFilter}
          handleRadioValues={handleRadioValues}
          selectedValue={selectedValue}
          productsData={productsType}
          checkedValue={typeValue}
          refs={ref_typeEls}
        />

  {/******************  brand  ************************* */}
        
        <FilterList
          section="brand"
          visibleSection={visibleSection}
          toggleArrowDrop={toggleArrowDrop}
          handleRemoveFilter={handleRemoveFilter}
          handleFilter={handleFilterBrand}
          values={brandValues}
          productsData={productsBrand}
          refs={ref_brandEls}
        />
      
  {/******************  Fetured  ************************* */}

        <FilterBoolean
          visibleSection={visibleSection}
          toggleArrowDrop={toggleArrowDrop}
          handleRemoveFilter={handleRemoveFilter}
          handleBooleanValues={handleBooleanValues}
          isPremium={isPremium}
          isFreeDelivery={isFreeDelivery}
          isToHome={isToHome}
          ref_premium_offer={ref_premium_offer}
          ref_free_delivery={ref_free_delivery}
          ref_to_home={ref_to_home}
        />
 
  {/***********************  price  ************************** */}

        <FilterTrack
          visibleSection={visibleSection}
          toggleArrowDrop={toggleArrowDrop}
          handleRemoveFilter={handleRemoveFilter}
          minPriceFromData={minPriceFromData}
          maxPriceFromData={maxPriceFromData}
          minPriceValue={minPriceValue}
          maxPriceValue={maxPriceValue}
          handleMinMaxPrice={handleMinMaxPrice}
          submitMinMix={submitMinMix}
        />
        
  {/***********************  color  ************************** */}
  
       <FilterCustom
          section="color"
          visibleSection={visibleSection}
          toggleArrowDrop={toggleArrowDrop}
          handleRemoveFilter={handleRemoveFilter}
          handleRadioValues={handleRadioValues}
          productsData={productsColor}
          checkedValue={colorValue}
          refs={ref_colorEls}
       />
        
  {/******************  rating  ************************* */}
  
      <FilterList
        section="rating"
        visibleSection={visibleSection}
        toggleArrowDrop={toggleArrowDrop}
        handleRemoveFilter={handleRemoveFilter}
        handleFilter={handleFilterRating}
        values={ratingValues}
        refs={ref_ratingEls}
      />

    </aside>
  )
}

export default FilterSidebar
