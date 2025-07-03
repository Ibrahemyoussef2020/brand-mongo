
import { FilterNavprops, FilterProps, ProductProps } from '@/types'
import { sortLists } from '@/utilities'
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { faBars, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {toggleMobileAsideFilter} from '@/redux/slices';
import Image from 'next/image'
import { IRootState } from '@/redux/store'



const FilterNav = ({products,setProducts,category,sort,setSort,handleSortStrategy,design,setDesign,filterSelectedList,filtersClear,setFiltersClear,maxCountProducts,handleFilter}:FilterNavprops) => {

  const dispatch = useDispatch()
  const {isOppend } =  useSelector((state:IRootState)=> state.combine.asideFilter)
  const verifiedRef = useRef<any>();

    const handleSort =  (e:React.ChangeEvent<HTMLSelectElement>):void=>{
      const {value} = e.target;
       setSort(e.target.value)
       const items = sortLists({filter:e.target.value,products})
        setProducts(items)
    }

    

    const handleBooleanValues = (e:React.ChangeEvent<HTMLInputElement>) => {
      const prop = e.target.name;

      handleFilter({
        prop: prop,
        checked: e.target.checked,
        value:e.target.value,
        values:[],
        type: 'boolean',
        filterFn:(product:ProductProps,filter:FilterProps) => product[prop as keyof  ProductProps]?.toString() === filter.checked.toString()
      }, e.target.checked)

      setFiltersClear(false)   
    }

    const isVierifiedFoundInFilters = filterSelectedList.some((filter:FilterProps) => filter.prop === 'verified')

    useEffect(()=>{
      if (filtersClear) {
        verifiedRef.current.checked = false;
      }

      if (!isVierifiedFoundInFilters) {
        verifiedRef.current.checked = false
      }
       
    },[filtersClear,filterSelectedList])


    const productsShowenCount = Math.min(maxCountProducts,+products.length)

  return (
    <nav className="filter-nav">
              <div className="left">
                <span>00,0{productsShowenCount}</span> <span>items <span>in</span></span> <span>{category}</span>
              </div>

              <div className="right">
                <label className={`verified`}>
                  <input
                   onChange={handleBooleanValues} 
                    type="checkbox" 
                    name="verified" 
                    value='verified'
                    ref={verifiedRef}
                    
                    />
                  <span>verified</span>
                </label>


                <div className='select-wrapper'>
                  <select 
                      onChange={handleSort}
                      className="featured-nav" id="featured-nav" name="featured-nav"
                  >
                      <option value="#">Featured</option>  
                      <option value="heigh-price">Price: heigh to Low</option>
                      <option value="low-price">Price: Low to heigh</option>
                      <option value="ratings">Avg.Customer Review</option>
                      <option value="new-arrivals">Newest  Arrivals</option>
                  </select>
                </div>

                <div className='mobile-filter-center'>
                  <div className="featured-nav-mobile">
                    <select 
                        onChange={handleSort}
                        id="featured-nav-mobile" name="featured-nav-mobile"
                    >
                        <option value="#">Featured</option>  
                        <option value="heigh-price">heigh price</option>
                        <option value="low-price">low price</option>
                        <option value="ratings">ratings</option>
                        <option value="new-arrivals">Newest</option>
                    </select>

                    <span className='icon-wrapper'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                  </div>

                  <button className='filter' onClick={()=>dispatch(toggleMobileAsideFilter(!isOppend))}>
                      <span className='text'>Filter({filterSelectedList?.length})</span>
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
                  <button className={`grid-btn-mode ${design === 'grid' ? 'selected' : ''}`} onClick={_=>setDesign('grid')}>
                    <Image
                      src='/images/icons/grid.png'
                      alt='Grid'
                      height={20}
                      width={20}
                    />
                  </button>
           
                  <button className={`list-btn-mode ${design === 'list' ? 'selected' : ''}`} onClick={_=>setDesign('list')}>
                  <Image
                      src='/images/icons/list-view.png'
                      alt='Grid'
                      height={20}
                      width={20}
                    />
                  </button>
                </div>

              </div>
          </nav>  
  )
}

export default FilterNav