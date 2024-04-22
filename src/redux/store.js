import authSlice from "./auth/authSlice";
import modalSlice from "./modal/modalSlice";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import roomSlice from "./room/roomSlice";
import categorySlice from "./category/categorySlice";
import commonSlice from "./common/commonSlice";


const reducer = combineReducers({
    modal: modalSlice,
    auth: authSlice,
    profile: profileSlice,
    room: roomSlice,
    category: categorySlice,
    common: commonSlice
})

const store = configureStore({
    reducer,
})

export default store;