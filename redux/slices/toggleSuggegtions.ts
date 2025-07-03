import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    suggegtionsFromRedux:[]
}

const suggegtionsSlice = createSlice({
    name:'toggleSuggegtions',
    initialState,
    reducers:{
        toggleSuggegtionsDrop:(state , action)=>{
          state.suggegtionsFromRedux = action.payload  || [];    
        }
    }
})

export const {toggleSuggegtionsDrop} = suggegtionsSlice.actions

export default suggegtionsSlice.reducer



