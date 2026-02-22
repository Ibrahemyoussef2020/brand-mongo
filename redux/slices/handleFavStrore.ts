import { ProductProps } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState } from "../store";
import { toast } from "react-toastify";

// Async Thunks
export const addToFavStore = createAsyncThunk("Fav/addToFavStore", async (product: ProductProps, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    toast.success("Added to Favorite");
    return product;
});

export const removeFromFavStore = createAsyncThunk("Fav/removeFromFavStore", async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    toast.info("Removed from Favorite");
    return productId;
});

const initialState = {
    favorites : [] as ProductProps[]
}

const FavSlice = createSlice({
    name : "Fav",
    initialState,
    reducers:{
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToFavStore.fulfilled, (state, action) => {
                const addedFav = state.favorites?.find((product: ProductProps) => product._id === action.payload._id);
                if (!addedFav) {
                    state.favorites = [...state.favorites, action.payload];
                }
            })
            .addCase(removeFromFavStore.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter((favorite: ProductProps) => favorite._id !== action.payload);
            });
    }
});

export const { setFavorites } = FavSlice.actions;
export default FavSlice.reducer;