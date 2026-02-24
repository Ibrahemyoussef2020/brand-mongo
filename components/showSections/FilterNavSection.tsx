'use client';

import { FilterNavprops, FilterProps } from '@/types'
import { sortLists } from '@/utilities'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileAsideFilter } from '@/redux/slices';
import Image from 'next/image'
import { AppDispatch, IRootState } from '@/redux/store'
import React, { useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext';
import { dictionaries } from '@/lib/dictionaries';


interface FilterNavSectionProps extends Omit<FilterNavprops, 'category'> {
    section: string;
}

const FilterNavSection = ({ products, setProducts, section, sort, setSort, design, setDesign, filterSelectedList, filtersClear, setFiltersClear, maxCountProducts, handleFilter }: FilterNavSectionProps) => {
  const { translate } = useLang();
  const dispatch =useDispatch<AppDispatch>()
  const { isOppend } = useSelector((state: IRootState) => state.combine.asideFilter)
  const verifiedRef = useRef<any>();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setSort(value)
    const items = sortLists({ filter: value, products })
    setProducts(items)
  }

  const handleBooleanValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prop = e.target.name;

    handleFilter({
      prop: prop,
      checked: e.target.checked,
      value: e.target.value,
      values: [],
      type: 'boolean',
    }, e.target.checked)

    setFiltersClear(false)
  }

  const isVerified = filterSelectedList.some((filter: FilterProps) => filter.prop === 'verified' && (filter.checked || filter.value === 'true'))

  useEffect(() => {
    if (filtersClear) {
      if (verifiedRef.current) verifiedRef.current.checked = false;
    }
  }, [filtersClear])


  const productsShowenCount = Math.min(maxCountProducts, +products.length)

  return (
    <nav className="filter-nav">
      <div className="left">
        <span>00,0{productsShowenCount}</span> <span>{translate(dictionaries.filterNav.items)} <span>{translate(dictionaries.filterNav.in)}</span></span> <span>{section}</span>
      </div>

      <div className="right">
        <label className={`verified`}>
          <input
            onChange={handleBooleanValues}
            type="checkbox"
            name="verified"
            value='verified'
            checked={isVerified}
            ref={verifiedRef}

          />
          <span>{translate(dictionaries.filterNav.verified)}</span>
        </label>


        <div className='select-wrapper'>
          <select
            onChange={handleSort}
            value={sort || "#"}
            className="featured-nav" id="featured-nav" name="featured-nav"
          >
            <option value="#">{translate(dictionaries.filterNav.featured)}</option>
            <option value="heigh-price">{translate(dictionaries.filterNav.priceHighToLow)}</option>
            <option value="low-price">{translate(dictionaries.filterNav.priceLowToHigh)}</option>
            <option value="ratings">{translate(dictionaries.filterNav.avgCustomerReview)}</option>
            <option value="new-arrivals">{translate(dictionaries.filterNav.newestArrivals)}</option>
          </select>
        </div>

        <div className='mobile-filter-center'>
          <div className="featured-nav-mobile">
            <select
              onChange={handleSort}
              value={sort || "#"}
              id="featured-nav-mobile" name="featured-nav-mobile"
            >
              <option value="#">{translate(dictionaries.filterNav.featured)}</option>
              <option value="heigh-price">{translate(dictionaries.filterNav.highPriceShort)}</option>
              <option value="low-price">{translate(dictionaries.filterNav.lowPriceShort)}</option>
              <option value="ratings">{translate(dictionaries.filterNav.ratingsShort)}</option>
              <option value="new-arrivals">{translate(dictionaries.filterNav.newestShort)}</option>
            </select>

            <span className='icon-wrapper'>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <button className='filter' onClick={() => dispatch(toggleMobileAsideFilter(!isOppend))}>
            <span className='text'>{translate(dictionaries.filterNav.filter)}({filterSelectedList?.length})</span>
            <span className='icon'>
              <Image
                src='/images/icons/filter.png'
                alt=''
                height={12}
                width={12}
              />
            </span>
          </button>
        </div>

        <div className='modes'>
          <button className={`grid-btn-mode ${design === 'grid' ? 'selected' : ''}`} onClick={_ => setDesign('grid')}>
            <Image
              src='/images/icons/grid.png'
              alt={translate(dictionaries.filterNav.grid)}
              height={20}
              width={20}
            />
          </button>

          <button className={`list-btn-mode ${design === 'list' ? 'selected' : ''}`} onClick={_ => setDesign('list')}>
            <Image
              src='/images/icons/list-view.png'
              alt={translate(dictionaries.filterNav.list)}
              height={20}
              width={20}
            />
          </button>
        </div>

      </div>
    </nav>
  )
}

export default FilterNavSection
