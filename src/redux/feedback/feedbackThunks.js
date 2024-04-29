import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../modal/modalSlice"

export const createFeedback = createAsyncThunk('room/sendFeedback', async(data, thunkApi)=>{
    try {    
        const reponse = await http.post(`api/Feedbacks`, data)
        return reponse


    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})