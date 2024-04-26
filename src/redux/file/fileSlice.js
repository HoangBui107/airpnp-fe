import { createSlice } from "@reduxjs/toolkit";
import { getMultiPreSignURL, getPreSignURL, uploadImageProductToS3 } from "./fileThunk";




const initialState ={
    loading: false,
    error: '',
    data: [],
    details: []
}


const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getPreSignURL.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getPreSignURL.fulfilled, (state, action) =>{
            state.loading=false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getPreSignURL.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getMultiPreSignURL.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getMultiPreSignURL.fulfilled, (state, action) =>{
            state.loading=false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getMultiPreSignURL.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(uploadImageProductToS3.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(uploadImageProductToS3.fulfilled, (state, action) =>{
            state.loading=false
            state.details = action.payload
            state.error = ''
        })
        builder.addCase(uploadImageProductToS3.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })




    }
   
});


export default fileSlice.reducer