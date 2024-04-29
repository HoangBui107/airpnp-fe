import { createSlice } from "@reduxjs/toolkit";
import { createFeedback } from "./feedbackThunks";



const initialState ={
    loading: false,
    error: '',
    status: []
}


const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(createFeedback.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(createFeedback.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(createFeedback.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
});

export const {filterByName} = feedbackSlice.actions
export default feedbackSlice.reducer