// http://api.geonames.org/countryInfoJSON?username=hoangbuine

import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getCountry = createAsyncThunk('common/getCountry', async(_, thunkApi)=>{
    try {
        const reponse = await axios.get('http://api.geonames.org/countryInfoJSON?username=hoangbuine')
        // console.log(reponse.data.geonames)
        return reponse.data.geonames
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const getCityByCountry = createAsyncThunk('common/getCityByCountry', async(data, thunkApi)=>{
    
    const {country} = data
    console.log(country)
    try {
        const reponse = await axios.get(`http://api.geonames.org/searchJSON?country=${country}&featureCode=PPLA&username=hoangbuine`)
        return reponse.data.geonames
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


export const getDistrictByCityId = createAsyncThunk('common/getDistrictByCityId', async(data, thunkApi)=>{
    const {id} = data
    console.log(id)
    try {
        const reponse = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${id}&username=hoangbuine`)
        return reponse.data.geonames
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})


// http://api.geonames.org/childrenJSON?geonameId=1583992&username=hoangbuine
