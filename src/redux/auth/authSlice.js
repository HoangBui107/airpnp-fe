import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authThunks";
import { jwtDecode } from "jwt-decode";


const initialState ={
    isLogin: false, 
    loading: false,
    error: '',
    token: [],
    user:[],
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logOut:(state, action)=>{
            state.isLogin = false; 
        } ,
    },
    extraReducers: builder=>{
        builder.addCase(login.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) =>{
            state.loading=false
            state.token = action.payload.token
            localStorage.setItem("token",action.payload.token) 
            state.user = jwtDecode(action.payload.token)
            state.isLogin= true
            state.error = ''
        })
        builder.addCase(login.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(register.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(register.fulfilled, (state, action) =>{
            state.loading=false
            state.token = action.payload.token
            localStorage.setItem("token",action.payload.token)
            state.isLogin= true
            state.error = ''
        })
        builder.addCase(register.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
   
});

export const {logOut} = authSlice.actions
export default authSlice.reducer