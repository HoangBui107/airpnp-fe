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

export const getPresignUrl = createAsyncThunk('room/getPresignUrl', async(data, thunkApi)=>{
    const {roomId, quantity} = data
    try {
        const reponse = await http.get(`api/Rooms/PreSignUrlToUploadImage/${roomId}/${quantity}`)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const createRoom = createAsyncThunk('room/createRoom', async(data, thunkApi)=>{
    try {
        const reponse = await http.post(`api/Rooms/`,data)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const deleteRoom = createAsyncThunk('room/deleteRoom', async(data, thunkApi)=>{
    try {
        const reponse = await http.delete(`api/Rooms/${data}`)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const sendFeedback = createAsyncThunk('room/sendFeedback', async(data, thunkApi)=>{
    try {    const {id} = data

        const reponse = await http.post(`api/Rooms/SendFeedback/${id}`, data)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})