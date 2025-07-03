import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import {  FilterProps,FiltersSelectedProps } from '@/types'
import { Dispatch, SetStateAction, useRef } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const FiltersSelected = ({filterSelectedList,filterRemove,setFilterRemove,setFiltersClear,setMaxCountProducts}:FiltersSelectedProps) => {

  const handleClear = ()=>{
    setFiltersClear(true) 
    setMaxCountProducts(100)
  }

  return (
    <div className={`filter-selected-list ${filterSelectedList.length ? '' : 'empty-selected-list'}`}>
      {filterSelectedList?.length ?  <button onClick={handleClear} className="clear-selected-filters">
        Clear all filter
      </button> : null}
      {filterSelectedList?.length ? <Swiper
        slidesPerView={3}
        spaceBetween={7}
        loop={true}
        breakpoints={{
          570: {
            slidesPerView: 5,
          },
        }}
      >
        {
          filterSelectedList
            .filter((filter:FilterProps)=> filter.type !== 'remove-filter' && filter.type !== 'clear' && filter.prop !== 'price')
            .map((filter:FilterProps)=> {
              
            if (filter.hasOwnProperty('values')  && filter.values.length) {

              const prop = filter.prop;
              
              return filter.values.map((f:string) => (
                <SwiperSlide
                  key={f}
                  className="filter-selected"
                >
                <button onClick={_=> setFilterRemove({name:`${prop}`,value:f})}>
                  <span className="value">{typeof parseInt(f) === 'number' && parseInt(f) < 6 ? `${f} rate` : f}</span>
                  <span className="close">
                  <FontAwesomeIcon icon={faXmark} />
                  </span>
                </button>
                </SwiperSlide>
              ))
            }
            else if (filter.hasOwnProperty('value')) {
              
              return <SwiperSlide
              key={filter.value}
              className="filter-selected"
            >
                <button onClick={_=> setFilterRemove({name:`${filter.prop}`,value:`${filter.value}`})}>
                  <span className="value">{filter.value}</span>

                  <span className="close">
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </button>
            </SwiperSlide>    
            }
          })
        }
      </Swiper> : null}
    </div>
  )
}

export default FiltersSelected