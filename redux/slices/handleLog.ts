import {createSlice} from '@reduxjs/toolkit'


const storageIsLogged = false
const storageUserInfo =  {
    userName:'',
    userEmail:'',
    userPassword:''
}


const initialState = {
    isLogged:storageIsLogged,
    isSubscriber: false,
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
            state.isSubscriber = false
            state.userInfo = {userName:'',userEmail:'',userPassword:''}
            localStorage.setItem('isLogged' , JSON.stringify(state.isLogged))
            localStorage.setItem('user' , JSON.stringify(state.userInfo))
        },
        setSubscriberStatus: (state, action) => {
            state.isSubscriber = action.payload;
        }
    }
})

export const {logUp,logOut, setSubscriberStatus} = LogSlice.actions

export default LogSlice.reducer