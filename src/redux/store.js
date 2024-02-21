const { configureStore, combineReducers } = require("@reduxjs/toolkit");

const reducer = combineReducers({

})

const store = configureStore({
    reducer,
})

export default store;