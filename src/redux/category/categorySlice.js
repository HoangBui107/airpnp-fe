import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory, createCategory, updateCategory, deleteCategory } from "./categoryThunk";

const initialState ={
    loading: false,
    error: '',
    categories: []
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
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(getAllCategory.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(createCategory.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(createCategory.fulfilled, (state, action) =>{
            state.loading=false
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(createCategory.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(updateCategory.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(updateCategory.fulfilled, (state, action) =>{
            state.loading=false
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(updateCategory.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(deleteCategory.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) =>{
            state.loading=false
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(deleteCategory.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
});


export default categorySlice.reducer