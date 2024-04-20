import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"

export const getAllCategory = createAsyncThunk('room/getAllCategory', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('Categories')
        console.log(reponse)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})