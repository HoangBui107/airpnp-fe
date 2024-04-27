import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoom, getAllRooms, getRoomStatus, getRoomById, getMultiPreSignURL, uploadImageProductToS3 } from "./roomThunks";



const initialState ={
    loading: false,
    error: '',
    room: [],
    details:{},
    status: []
}


const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers:{
        filterByName: (state, action) => {
            const data = state.room
            state.room = data.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))

        }
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

        builder.addCase(getRoomStatus.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getRoomStatus.fulfilled, (state, action) =>{
            state.loading=false
            state.status = action.payload
            state.error = ''
        })
        builder.addCase(getRoomStatus.rejected, (state,action) =>{
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

        builder.addCase(createRoom.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(createRoom.fulfilled, (state, action) =>{
            state.loading=false
            state.room = [...state.room, action.payload]
            state.error = ''
        })
        builder.addCase(createRoom.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(deleteRoom.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(deleteRoom.fulfilled, (state, action) =>{
            state.loading=false
            state.room = state.room.filter((item) => item.id !== action.payload)
            state.error = ''
        })
        builder.addCase(deleteRoom.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
   
});

export const {filterByName} = roomSlice.actions
export default roomSlice.reducer