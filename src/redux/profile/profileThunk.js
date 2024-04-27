import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../modal/modalSlice"

export const getProfileByToken = createAsyncThunk('profile/getProfileByToken', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('api/Profiles')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Profile Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const updateProfile = createAsyncThunk('profile/updateProfile', async(data, thunkApi)=>{
    const {id ,...data1} = data
    try {
        const reponse = await http.put(`api/Profiles/${id}`,data1)
        thunkApi.dispatch(openMessage({message:"Update Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Profile Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})