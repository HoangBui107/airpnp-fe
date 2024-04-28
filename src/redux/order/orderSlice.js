import { createSlice } from "@reduxjs/toolkit";
import { createOrder, createOrderPaypal, getOrder, getOrderById, onApprove } from "./orderThunk";



const initialState ={
    loading: false,
    error: '',
    details: [],
    data: []                                                              
}


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getOrderById.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getOrderById.fulfilled, (state, action) =>{
            state.loading=false
            // console.log(action.payload)
            state.details = action.payload
            state.error = ''
        })
        builder.addCase(getOrderById.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getOrder.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getOrder.fulfilled, (state, action) =>{
            state.loading=false
            // console.log(action.payload)
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getOrder.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(createOrderPaypal.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(createOrderPaypal.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(createOrderPaypal.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(onApprove.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(onApprove.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(onApprove.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
   
});


export default profileSlice.reducer