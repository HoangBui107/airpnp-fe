import authSlice, { setIsLogin } from "./auth/authSlice";
import modalSlice from "./modal/modalSlice";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import roomSlice from "./room/roomSlice";
import categorySlice from "./category/categorySlice";
import commonSlice from "./common/commonSlice";
import { jwtDecode } from "jwt-decode";
import fileSlice from"./file/fileSlice"
const checkTokenExpiration = (store) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date().getTime();
      const isTokenExpired = decodedToken.exp * 1000 < currentDate;
      store.dispatch(setIsLogin(!isTokenExpired));
    } else {
      store.dispatch(setIsLogin(false));
    }
  };

const reducer = combineReducers({
    modal: modalSlice,
    auth: authSlice,
    profile: profileSlice,
    room: roomSlice,
    category: categorySlice,
    common: commonSlice,
    file: fileSlice
})

const store = configureStore({
    reducer,
})

checkTokenExpiration(store);
export default store;