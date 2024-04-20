import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"

export const getProfileByToken = createAsyncThunk('profile/getProfileByToken', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('api/Profiles')
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const updateProfile = createAsyncThunk('profile/updateProfile', async(data, thunkApi)=>{
    const {id ,...data1} = data
    try {
        const reponse = await http.put(`api/Profiles/${id}`,data1)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})