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
import { IRootState } from "@/redux/store"
import { fetchAllProducts } from "@/lib/services"


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

  const dispatch = useDispatch()
  const router = useRouter()

    
  const fetchAllProductsFn = async()=>{
    const data = await fetchAllProducts('homeConsumer')
    setSugsList(data.data)      
  }
  

  useEffect(()=>{
    fetchAllProductsFn()  
  },[sug])
    

    const handleSug  = (e:React.FormEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        if (value === '') {
          dispatch(toggleSuggegtionsDrop([]))
          setCloseClass('hidden');
        }
        else{
          dispatch(toggleSuggegtionsDrop([...doesObjectInclude(sugList , value)]))
          setCloseClass('visible');  
        }
        setSug(value)
    }

    const handleSearchTitle = (sugResultId:string) => {
      router.push(`/itemDetails/consumer-sections/${sugResultId}`)
      dispatch(toggleSuggegtionsDrop([]))
  }

  const handleCloseDrop = ()=>{
    setSug('')
    dispatch(toggleSuggegtionsDrop([]))
  }

  const handleDrop = ()=>{
    setCloseClass('visible');
    dispatch(toggleSuggegtionsDrop(sugList))  
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
              placeholder="Search"
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
       
                  <h1>{sug._id}</h1>
                  <a onClick={_=>handleSearchTitle(sug.static_id)}>
                  {sug.title}
                  </a>
                </article> 
              )) : null
            }
          </div>
        </div>
        <select name="search-select" id="search-select">
          <option value="Option_One">Option One</option>
        </select>
        <button className='search_button'>
          Search
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
              placeholder="Search"
              onChange={handleSug}
              onFocus={_=>dispatch(toggleSuggegtionsDrop(sugList))}
          />
          <button className={`search_close ${closeClass}`}  onClick={_=>handleCloseDrop()}>
          <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className='suggegtion_list'>
            {
              suggegtionsFromRedux && suggegtionsFromRedux.length ?
              suggegtionsFromRedux?.map((sug:ProductProps )=> (
                <article key={sug._id + '' + sug.static_id}>
                   <h1>{sug._id}</h1>
                  <a onClick={_=>handleSearchTitle(sug.static_id)}>
                    {sug.title} 
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