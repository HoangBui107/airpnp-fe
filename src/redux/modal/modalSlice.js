import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    login: false,
    register: false,
    forgetPassword:false,
    notification: {message: '', notificationType:''}
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openLogin:(state, action)=>{
            state.login = true; 
        } ,
        closeLogin: (state, action)=>{
            state.login = false; 
        },
        openForgetPassword:(state, action)=>{
            state.forgetPassword = true; 
        } ,
        closeFotgetPassword: (state, action)=>{
            state.forgetPassword = false; 
        },
        openRegister: (state, action)=>{
            state.register = true;
        },
        closeRegister: (state, action)=>{
            state.register = false
        },
        openMessage:(state,action)=>{
            state.notification.message = action.payload.message
            state.notification.notificationType = action.payload.notificationType
        },
        resetMessage: (state) => {
            state.notification.message = '';
            state.notification.notificationType = '';
          }
    },
   
});

export const {openLogin, closeLogin,openRegister,closeRegister, openMessage,resetMessage, closeFotgetPassword, openForgetPassword} = modalSlice.actions
export default modalSlice.reducer