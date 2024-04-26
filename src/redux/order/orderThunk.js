import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"

export const getOrder = createAsyncThunk('order/getProfileByToken', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('/Orders')
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const getOrderById = createAsyncThunk('order/getOrderById', async(data, thunkApi)=>{
    const {id} = data
    try {
        const reponse = await http.get(`/Orders${id}`)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})



export const createOrder = createAsyncThunk('order/createOrder', async(data, thunkApi)=>{
    const {id} = data
    try {
        const reponse = await http.get(`/Orders${id}`, data)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})