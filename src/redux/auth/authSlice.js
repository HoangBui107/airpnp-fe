import { createSlice } from "@reduxjs/toolkit";
import { activeUser, bandUser, changePassword, getAllStore, getAllUser, getTopDeals, login, register, resetPassword } from "./authThunks";
import { jwtDecode } from "jwt-decode";


const initialState ={
    isLogin: false, 
    loading: false,
    error: '',
    token: [],
    user:[],
    data:[],
    store:[],
    topDeals:[]
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logOut:(state, action)=>{
            localStorage.removeItem('token')
            state.isLogin = false; 
            window.location.href ="/"
        } ,
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setToken:(state,action)=>{
            state.token = action.payload
        }
    },
    extraReducers: builder=>{
        builder.addCase(login.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) =>{
            state.loading=false
            state.token = action.payload.token
            localStorage.setItem("token",action.payload.token) 
            state.user = jwtDecode(action.payload.token)
            state.isLogin= true
            state.error = ''
        })
        builder.addCase(login.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(register.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(register.fulfilled, (state, action) =>{
            state.loading=false
            state.token = action.payload.token
            localStorage.setItem("token",action.payload.token)
            state.isLogin= true
            state.error = ''
        })
        builder.addCase(register.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(resetPassword.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(resetPassword.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(resetPassword.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(changePassword.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(changePassword.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(changePassword.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getAllUser.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllUser.fulfilled, (state, action) =>{
            state.loading=false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getAllUser.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getAllStore.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllStore.fulfilled, (state, action) =>{
            state.loading=false
            state.store = action.payload
            state.error = ''
        })
        builder.addCase(getAllStore.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getTopDeals.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getTopDeals.fulfilled, (state, action) =>{
            state.loading=false
            state.topDeals = action.payload
            state.error = ''
        })
        builder.addCase(getTopDeals.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(bandUser.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(bandUser.fulfilled, (state, action) =>{
            state.loading=false
            state.details = action.payload
            state.error = ''
        })
        builder.addCase(bandUser.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(activeUser.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(activeUser.fulfilled, (state, action) =>{
            state.loading=false
            state.details = action.payload
            state.error = ''
        })
        builder.addCase(activeUser.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
   
});

export const {logOut, setIsLogin, setToken} = authSlice.actions
export default authSlice.reducer