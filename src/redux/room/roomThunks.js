import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"

export const getAllRooms = createAsyncThunk('room/getAllRooms', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('api/Rooms')
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const getRoomById = createAsyncThunk('room/getRoomById', async(data, thunkApi)=>{
    const {id} = data
    try {
        const reponse = await http.get(`api/Rooms/${id}`)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})