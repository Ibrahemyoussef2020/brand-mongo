import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOppend :false
}

const AsideSlice = createSlice({
    name:'toggleAside',
    initialState,
    reducers:{
        toggleAside:(state , action)=>{
          state.isOppend = action.payload  || !state.isOppend;    
        }
    }
})

export const {toggleAside} = AsideSlice.actions

export default AsideSlice.reducer