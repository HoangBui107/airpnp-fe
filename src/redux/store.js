import modalSlice from "./modal/modalSlice";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";


const reducer = combineReducers({
    modal: modalSlice
})

const store = configureStore({
    reducer,
})

export default store;