'use client';

import customObjectIncludes from '@/utilities/customObjectIncludes'
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, addToFavStore, removeFromCart, removeFromFavStore} from '@/redux/slices'
import { ProductProps } from '@/types';
import Image from 'next/image';
import { IRootState } from '@/redux/store';

interface props{
    product:ProductProps,
    process:string
}


const AddRemoveCart = ({product,process='add' }:props) => {
    const dispatch = useDispatch()
    const {products} = useSelector((state:IRootState) => state.combine.cart)

    const addToCartProduct = ()=>{

        const storedProduct = products.find((item:ProductProps) => item._id === product._id)

        const addedProduct = {
            ...product,
            quantity:storedProduct ? storedProduct.quantity : 1,
            deliveryPrice: product.free_delivery ? 0 : 50, 
            total:storedProduct ? +storedProduct.quantity * +storedProduct.price : product.price * 1
        } 

        dispatch(addToCart(addedProduct))
    }


   const addFavToCartProduct =()=>{
    addToCartProduct();
    dispatch(removeFromFavStore(product._id))
   }

    const removeFromCartProduct = ()=>{
        dispatch(removeFromCart(product._id))
    }

    
    
  if (process === 'add') {

        if (customObjectIncludes(products,product._id)) {
            const targetProduct = products.find((item:ProductProps) => item._id === product._id)
            
            return(
                <button className='buy' onClick={addToCartProduct}>
                   {targetProduct ? `Add More ${targetProduct.quantity}+` : 'Add To Cart' }
                </button>
            )
        }
        else{
           return (
            <button className='buy' onClick={addToCartProduct}>
                Add To Cart
            </button>
           ) 
        }
  }

  if (process === 'add-from-fav-sm') {
    return (
        <button className="add-fav" onClick={addFavToCartProduct}>Move to cart</button>
      )
  }

  if (process === 'add-from-fav-lg') {
    return(
        <button className="add-cart"  onClick={addFavToCartProduct}>
            <Image
            src='/images/icons/shopping_cart.png'
            alt=''
            width={20}
            height={20}
            />
            <span>Move to cart</span>
    </button>
    )
  }

  if (process === 'remove') {
    return (
        <button className='return' onClick={removeFromCartProduct}>
            remove
        </button>
      )
  }
}

export default AddRemoveCart