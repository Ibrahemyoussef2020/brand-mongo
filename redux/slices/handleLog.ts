import {createSlice} from '@reduxjs/toolkit'


const storageIsLogged = false
const storageUserInfo =  {
    userName:'',
    userEmail:'',
    userPassword:''
}


const initialState = {
    isLogged:storageIsLogged,
    userInfo:{
        userName:storageUserInfo.userName,
        userEmail:storageUserInfo.userEmail,
        userPassword:storageUserInfo.userPassword
    }
}

const LogSlice = createSlice({
    name:'LogSlice',
    initialState,
    reducers:{
        logUp:(state , action)=>{
            state.isLogged = true    
            state.userInfo = {...action.payload}
            localStorage.setItem('isLogged' , JSON.stringify(state.isLogged))
            localStorage.setItem('user' , JSON.stringify(state.userInfo))
        },
        logOut:(state)=>{
            state.isLogged = false
            state.userInfo = {userName:'',userEmail:'',userPassword:''}
            localStorage.setItem('isLogged' , JSON.stringify(state.isLogged))
            localStorage.setItem('user' , JSON.stringify(state.userInfo))
        }
    }
})

export const {logUp,logOut} = LogSlice.actions

export default LogSlice.reducer