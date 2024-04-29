import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../modal/modalSlice"
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "",
});

export const getPreSignURL = createAsyncThunk('file/getPreSignURL', async (_, thunkApi) => {
    try {
        const reponse = await http.get(`api/Profiles/PreSignUrlToUploadAvatar`)
        return reponse
    } catch (error) {
        if (error.statusCode === 403) {
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const getAllRooms = createAsyncThunk('room/getAllRooms', async(data, thunkApi)=>{
    const{categoryId, name} = data
    try {

            const reponse = await http.get(`api/Rooms${categoryId ? `?id=${categoryId}` : '?'} ${name? `&name=${name}` : `&`}`)
            return reponse
        
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const getRoomById = createAsyncThunk('room/getRoomById', async(data, thunkApi)=>{
    try {    const {id} = data

        const reponse = await http.get(`api/Rooms/GetRoomById/${id}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const getRoomOrdersStats = createAsyncThunk('room/RoomOrdersStats', async(_, thunkApi)=>{
    try {
        const reponse = await http.get(`api/Rooms/GetRoomOrdersStats`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))


        return thunkApi.rejectWithValue(error)
    }
})

export const getRoomOrdersStatsById = createAsyncThunk('room/getRoomOrdersStatsById', async(id, thunkApi)=>{
    try {
        const reponse = await http.get(`api/Rooms/getRoomOrdersStatsById/${id}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))


        return thunkApi.rejectWithValue(error)
    }
})

export const createRoom = createAsyncThunk('room/createRoom', async(data, thunkApi)=>{
    try {
        const response1 = await http.post(`api/Rooms/`,data)

        const response2 = await http.get(`api/Rooms/PreSignUrlToUploadImage/${response1.id}/${data.files.length}`)
  
        for (let index = 0; index < response2.length; index++) {
            const reponse = await axiosClient.put(response2[index].preSignedUrl, data.files[index]);

        }
        return 
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))

        return thunkApi.rejectWithValue(error)
    }
})

export const updateRoom = createAsyncThunk('room/updateRoom', async(data, thunkApi)=>{
    try {    const {id} = data

        const response1 = await http.put(`api/Rooms/${id}`,data)
        return 
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))

        return thunkApi.rejectWithValue(error)
    }
})

export const deleteRoom = createAsyncThunk('room/deleteRoom', async(data, thunkApi)=>{
    try {
        const reponse = await http.delete(`api/Rooms/${data}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const sendFeedback = createAsyncThunk('room/sendFeedback', async(data, thunkApi)=>{
    const {id} = data
    try {    
        const reponse = await http.post(`api/Rooms/SendFeedback/${id}`, data)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})