import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    login: false,
    register: false,
    notification: {message: '', notificationType:''}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logOut:(state, action)=>{
            state.login = false; 
        } ,
    },
   
});

export const {logOut} = authSlice.actions
export default authSlice.reducer