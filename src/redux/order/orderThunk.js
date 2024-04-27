import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../modal/modalSlice"

export const getOrder = createAsyncThunk('order/getProfileByToken', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('/Orders')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Order Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const getOrderById = createAsyncThunk('order/getOrderById', async(data, thunkApi)=>{
    const {id} = data
    try {
        const reponse = await http.get(`/Orders${id}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Order Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})



export const createOrder = createAsyncThunk('order/createOrder', async(data, thunkApi)=>{
    const {id} = data
    try {
        const reponse = await http.get(`/Orders${id}`, data)
        thunkApi.dispatch(openMessage({message:"Create order success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Profile Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})