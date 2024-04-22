import { createSlice } from "@reduxjs/toolkit";
import { getCityByCountry, getCountry, getDistrictByCityId } from "./commonThunk";




const initialState ={
    loading: false,
    error: '',
    country: [],
    city:[],
    district: []
}


const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getCountry.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getCountry.fulfilled, (state, action) =>{
            state.loading=false
            state.country = action.payload
            state.error = ''
        })
        builder.addCase(getCountry.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getCityByCountry.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getCityByCountry.fulfilled, (state, action) =>{
            state.loading=false
            state.city = action.payload
            state.error = ''
        })
        builder.addCase(getCityByCountry.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getDistrictByCityId.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getDistrictByCityId.fulfilled, (state, action) =>{
            state.loading=false
            state.district = action.payload
            state.error = ''
        })
        builder.addCase(getDistrictByCityId.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })


    }
   
});


export default commonSlice.reducer