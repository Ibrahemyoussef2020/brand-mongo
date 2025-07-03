import { addToCart, removeFromCart, clearCart, handleProductsQuantity, handleBill , increaseQuantity ,decreaseQuantity} from "./handleCart";
import {toggleSuggegtionsDrop} from './toggleSuggegtions';
import { toggleAside } from "./toggleAside";
import {toggleMobileFilterSuggegtionsDrop} from "./toggleMobileFilterSuggegtions"
import {logUp,logOut} from "./handleLog"
import {toggleMobileAsideFilter} from './toggleMobileAsideFilter'
import {addToFavStore , removeFromFavStore} from './handleFavStrore'
export { default as cartReducer } from "./handleCart";
export { default as suggegtionsReducer } from "./toggleSuggegtions";
export {default as asideReducer} from "./toggleAside";
export {default as suggegtionsMobileFilterReducer} from "./toggleMobileFilterSuggegtions"
export {default as LogReducer} from "./handleLog"
export {default as asideFilterSlice} from './toggleMobileAsideFilter'
export {default as FavReducer} from './handleFavStrore';
export {addToCart, removeFromCart , clearCart , handleProductsQuantity , handleBill , toggleSuggegtionsDrop , increaseQuantity ,decreaseQuantity, toggleMobileFilterSuggegtionsDrop , toggleAside , logUp ,logOut,toggleMobileAsideFilter , addToFavStore , removeFromFavStore };
