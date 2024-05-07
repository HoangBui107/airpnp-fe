import authSlice, { setIsLogin } from "./auth/authSlice";
import modalSlice from "./modal/modalSlice";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import roomSlice from "./room/roomSlice";
import categorySlice from "./category/categorySlice";
import orderSlice from "./order/orderSlice";
import userRoleSlice from "./userRole/userRoleSlice";

const reducer = combineReducers({
    modal: modalSlice,
    auth: authSlice,
    profile: profileSlice,
    room: roomSlice,
    category: categorySlice,
    order: orderSlice,
    userRole: userRoleSlice
})

const store = configureStore({
    reducer,
})

export default store;