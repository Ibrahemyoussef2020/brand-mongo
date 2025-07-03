import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOppend :false
}

const AsideFilterSlice = createSlice({
    name:'toggle-mobile-aside-filter',
    initialState,
    reducers:{
        toggleMobileAsideFilter:(state , action)=>{
          state.isOppend = action.payload  || !state.isOppend;    
        }
    }
})

export const {toggleMobileAsideFilter} = AsideFilterSlice.actions

export default AsideFilterSlice.reducer