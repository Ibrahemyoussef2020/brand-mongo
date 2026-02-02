'use client';

import customObjectIncludes from '@/utilities/customObjectIncludes'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addToFavStore, removeFromFavStore} from '@/redux/slices'
import { ProductProps } from '@/types';
import { AppDispatch, IRootState } from '@/redux/store';


interface props{
    product:ProductProps,
    component:string
}

const ToggleFav = ({product , component}:props) => {

  const dispatch = useDispatch<AppDispatch>()
  const {favorites} = useSelector((state:IRootState) => state.combine.fav)

 
  const toggleFavProduct = ()=>{
    if (customObjectIncludes(favorites,product._id) ) {
      dispatch(removeFromFavStore(product._id))
    }else{
      dispatch(addToFavStore(product))
    }
  }
  

  if (component === 'small') {
    return (
      <button className="add-fav" onClick={toggleFavProduct}>
          {
              customObjectIncludes(favorites,product._id) ? 
  
              <FontAwesomeIcon icon={faHeart} />
  
              : <Image
                  src='/images/icons/favorite-primary.png'
                  alt=""
                  height={24}
                  width={24}
              /> 
          }
      </button>
    )
  }

  if (component === 'large') {
    return (
      <button className="add-fav" onClick={toggleFavProduct}>
            {
                customObjectIncludes(favorites,product?._id) ? 

                <FontAwesomeIcon icon={faHeart} />

                : <Image
                        src='/images/icons/favorite-primary.png'
                        alt=""
                        height={24}
                        width={24}
                /> 
            }
            <span>Save for later</span>
       </button>
    )
  }

  if (component === 'small-cart') {
    return (
      <button className="add-fav" onClick={toggleFavProduct}>
            {
                customObjectIncludes(favorites,product?._id) ? 

                <FontAwesomeIcon icon={faHeart} />

                : <Image
                    src='/images/icons/favorite_border.png'
                    alt=""
                    height={18}
                    width={18}
                /> 
            }
       </button>
    )
  }
}

export default ToggleFav