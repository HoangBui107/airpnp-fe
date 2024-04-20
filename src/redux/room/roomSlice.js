import { createSlice } from "@reduxjs/toolkit";
import { getAllRooms, getRoomById } from "./roomThunks";



const initialState ={
    loading: false,
    error: '',
    room: [],
    details:[],
}


const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getAllRooms.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllRooms.fulfilled, (state, action) =>{
            state.loading=false
            state.room = action.payload
            state.error = ''
        })
        builder.addCase(getAllRooms.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getRoomById.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getRoomById.fulfilled, (state, action) =>{
            state.loading=false
            state.details = action.payload
            state.error = ''
        })
        builder.addCase(getRoomById.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })


    }
   
});


export default roomSlice.reducer