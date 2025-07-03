import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mobileFilterSuggegtions:[]
}

const suggegtionsMobileFilterSlice = createSlice({
    name:'toggleMobileFilterSuggegtions',
    initialState,
    reducers:{
        toggleMobileFilterSuggegtionsDrop:(state , action)=>{
          state.mobileFilterSuggegtions = action.payload  || [];    
        }
    }
})

export const {toggleMobileFilterSuggegtionsDrop} = suggegtionsMobileFilterSlice.actions

export default suggegtionsMobileFilterSlice.reducer