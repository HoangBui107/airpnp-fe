import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import axios from "axios"

export const getPreSignURL = createAsyncThunk('file/getDistrictByCityId', async (_, thunkApi) => {
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

export const getMultiPreSignURL = createAsyncThunk('file/getMultiPreSignURL', async (data, thunkApi) => {
    const{id, quantity}= data
    try {
        const reponse = await http.get(`api/Rooms/PreSignUrlToUploadImage/${id}/${quantity}`)
        return reponse
    } catch (error) {
        if (error.statusCode === 403) {
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const uploadImageProductToS3 = createAsyncThunk('file/uploadImageProductToS3', async (data, thunkApi) => {
    const { url, file } = data
    console.log(file)
   
})

// export const uploadImageProductToS3 = (image, url) => {
//     return axios.put(url, image, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };