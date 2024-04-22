import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "./categoryThunk";




const initialState ={
    loading: false,
    error: '',
    category: []
}


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getAllCategory.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllCategory.fulfilled, (state, action) =>{
            state.loading=false
            state.category = action.payload
            state.error = ''
        })
        builder.addCase(getAllCategory.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })


    }
   
});


export default categorySlice.reducer