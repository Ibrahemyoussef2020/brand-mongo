import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {cartReducer , suggegtionsReducer , asideReducer , suggegtionsMobileFilterReducer , LogReducer , asideFilterSlice , FavReducer} from "./slices";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  WebStorage,
  PURGE
} from 'redux-persist';

import createWebStorage from "redux-persist/es/storage/createWebStorage";

export function createPresistStore(){

  const isServer = typeof window !== 'undefined' ;

    if (isServer) {
      return {
        getItem(){
          return Promise.resolve(null)
        },
        setItem(){
          return Promise.resolve();
        },
        removeItem(){
          return Promise.resolve()
        }
      }
    }

    return createWebStorage('local');
}


const storage = typeof window !== 'undefined' ? createWebStorage('local') : createPresistStore() 


const persistCong = {
  key:'browsring',
  storage
}

const combineReducer = combineReducers({
  cart:cartReducer,
  suggegtions:suggegtionsReducer,
  suggegtionsMobileFilter:suggegtionsMobileFilterReducer,
  aside:asideReducer,
  log:LogReducer,
  asideFilter:asideFilterSlice,
  fav:FavReducer
})

const persistedReducer = persistReducer(persistCong,combineReducer)


const store = configureStore({
  reducer: {
    combine:persistedReducer,
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          REGISTER,
          PURGE],
      }
    })
  },
  devTools:false
});

const persistor =  persistStore(store);

export {
  store,
  persistor
}
//export type IRootState = ReturnType<typeof store.combineReducer>
export type IRootState = ReturnType<typeof store.getState>


