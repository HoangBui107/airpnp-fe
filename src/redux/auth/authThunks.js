
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../api/axios-interceptor";
import { getProfileByToken } from "../profile/profileThunk";
import { openMessage } from "../modal/modalSlice";

// import { openMessage } from "../modal/modalSlice";

export const login = createAsyncThunk('auth/login', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('Login', data)
        thunkApi.dispatch(getProfileByToken());
        return reponse
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const register = createAsyncThunk('auth/register', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('Register', data)
        thunkApi.dispatch(openMessage({message:"Register Success! Please Login Again!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Register Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})
// export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async(token,thunkApi)=>{
//     try {
//         const response = await http.post('auth/login/google', token);
//         return response;
//     } catch (error) {
//         if(error.statusCode ===403){
//             thunkApi.dispatch(openMessage({message:"Your account is block! Please contact Admin", notificationType: 'error'}))
//         }
//         return thunkApi.rejectWithValue(error)
//     }
// })

export const changePassword = createAsyncThunk('auth/changePassword', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('ChangePassword', data)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Change Password Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async(data, thunkApi)=>{
    const {email} = data
    try {
        const reponse = await http.post(`ResetPassword/${email}`)
        thunkApi.dispatch(openMessage({message:"", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Reset Password Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})
