import { ProductProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const strorageFavorites:ProductProps[] | [] = [];

const initialState = {
    favorites : strorageFavorites
}

const FavSlice = createSlice({
    name : "Fav",
    initialState,
    reducers:{
        addToFavStore:(state,action)=>{
            const addedFav= state.favorites?.find((product:ProductProps )=> product._id === action.payload.id)

            if (!addedFav) {
                state.favorites = [...state.favorites,action.payload]
            }

        },
        removeFromFavStore:(state,action)=>{
            const removedFav= state.favorites?.find((product:ProductProps )=> product._id === action.payload.id)

            if (!removedFav) {
                state.favorites = state.favorites.filter((favorite:ProductProps)=> favorite._id !== action.payload)
            }

        },
    }
});

export const {addToFavStore,removeFromFavStore} = FavSlice.actions

export default FavSlice.reducer