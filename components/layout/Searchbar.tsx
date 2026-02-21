'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleSuggegtionsDrop } from "@/redux/slices" 
import { doesObjectInclude } from "@/utilities"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons'

import Link from "next/link"
import { ProductProps } from "@/types"
import { useRouter } from "next/navigation"
import { AppDispatch, IRootState } from "@/redux/store"
import { fetchAllProducts } from "@/lib/services"

import { dictionaries } from "@/lib/dictionaries"
import { useLang } from "@/context/LangContext"


interface prop{
  size:string
}


const Searchbar = ({size = 'pc'}:prop) => {
 const [sug , setSug] = useState('')
  const [sugList,setSugsList] = useState([])
  const [selectedValue , setSelectedValue] = useState('')
  const [magnifyingGlassColor , setMagnifyingGlassColor] = useState('text-costum-clr_primary')
  const [closeClass,setCloseClass] = useState('hidden');
  const {suggegtionsFromRedux} =  useSelector((state:IRootState )=> state.combine.suggegtions)
  const {translate, lang} = useLang();

  const dispatch =useDispatch<AppDispatch>()
  const router = useRouter();
    const { categories } = dictionaries.homeCover;

    
  const fetchAllProductsFn = async()=>{
    const data = await fetchAllProducts('homeConsumer')
    setSugsList(data.data)      
    return data.data;
  }
  



    

    const handleSug  = (e:React.FormEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        const currentLang = (lang as any) || 'en'; // lang from useLang
        if (value === '') {
          dispatch(toggleSuggegtionsDrop([]))
          setCloseClass('hidden');
        }
        else{
          dispatch(toggleSuggegtionsDrop([...doesObjectInclude(sugList , value, currentLang)]))
          setCloseClass('visible');  
        }
        setSug(value)
    }

    const handleSearchTitle = (sugResultId:string) => {
      router.push(`/${lang}/itemDetails/consumer-sections/${sugResultId}`)
      dispatch(toggleSuggegtionsDrop([]))
  }

  const handleCloseDrop = ()=>{
    setSug('')
    dispatch(toggleSuggegtionsDrop([]))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      router.push(`/${lang}/showCategories/${value}`);
    }
  }

  const handleDrop = async () => {
    let currentList = sugList;
    if (sugList.length === 0) {
       currentList = await fetchAllProductsFn();
    }
    setCloseClass('visible');
    dispatch(toggleSuggegtionsDrop(currentList));
  }

  return (
    
    <>
      {
         size === 'pc' ? 
        <div className='search_bar'>
        
        <div className='search_input_wrapper'>
          <input type="text"
              id="main-nav-search_"
              className='search_input'
              value={sug}
              placeholder={translate(dictionaries.searchbar.placeholder)}
              onChange={handleSug}
              onFocus={handleDrop}
          />
          <button className={`search_close ${closeClass}`} onClick={_=>handleCloseDrop()}>
          <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className='suggegtion_list'>
            {
              suggegtionsFromRedux && suggegtionsFromRedux.length ?
              suggegtionsFromRedux?.map((sug:ProductProps )=> (
                <article key={sug._id + '' + sug.static_id}>
                         <a onClick={_=>handleSearchTitle(sug.static_id)}>
                  {translate(sug.title)} 
                  </a>
                </article> 
              )) : null
            }
          </div>
        </div>
        <select name="search-select" id="search-select" onChange={handleCategoryChange}>
          <option value="">{translate(dictionaries.searchbar.allCategory)}</option>
          <option value="mobiles">{translate(categories.automobiles)}</option>
          <option value="fashion">{translate(categories.clothes)}</option>
          <option value="kitchen-tools">{translate(categories.homeInteriors)}</option>
          <option value="computers">{translate(categories.computerTech)}</option>
          <option value="kitchen-tools">{translate(categories.toolsEquipments)}</option>
          <option value="sports">{translate(categories.sportsOutdoor)}</option>
          <option value="pets">{translate(categories.animalPets)}</option>
          <option value="chairs">{translate(categories.officeFurniture)}</option>
          <option value="headphones">{translate(categories.moreCategory)}</option>
        </select>
        <button className='search_button'>
          {translate(dictionaries.searchbar.searchBtn)}
        </button>
      </div>
      : 
      <div className='search_bar'>
        <div className='search_input_wrapper'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='magnifying' width={19} color="#8b96a5" />
          <input type="text"
              id="main-nav-search_"
              className='search_input'
              value={sug}
              placeholder={translate(dictionaries.searchbar.placeholder)}
              onChange={handleSug}
              onFocus={handleDrop}
          />
          <button className={`search_close ${closeClass}`}  onClick={_=>handleCloseDrop()}>
          <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className='suggegtion_list'>
            {
              suggegtionsFromRedux && suggegtionsFromRedux.length ?
              suggegtionsFromRedux?.map((sug:ProductProps )=> (
                <article key={sug._id + '' + sug.static_id}>
                  <a onClick={_=>handleSearchTitle(sug.static_id)}>
                    {translate(sug.title)} 
                  </a>
                </article> 
              )) : null
            }
          </div>
        </div>
    </div>   
      }
     
    </>
  )
}

export default Searchbar