import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"

export const getAllCategory = createAsyncThunk('category/getAllCategory', async(_, thunkApi)=>{
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


export const createCategory = createAsyncThunk('category/createCategory', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('Categories', data)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const updateCategory = createAsyncThunk('category/updateCategory', async(data, thunkApi)=>{
    try {
        const {id} = data
            console.log(id)
        const reponse = await http.put(`Categories/${id}`, data)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteCategory = createAsyncThunk('category/deleteCategory', async(data, thunkApi)=>{
    try {
        const reponse = await http.delete(`Categories/${data}`)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})