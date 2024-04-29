
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


export const getAllUser = createAsyncThunk('auth/getAllUser', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('GetAllUser')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const getTopDeals = createAsyncThunk('auth/getTopDeals', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('GetTopDeals')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const getAllStore = createAsyncThunk('auth/getAllStore', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('GetAllStore')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

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

