import { combineReducers } from "@reduxjs/toolkit";

// reducer
import count from './count/slice'

const appReducer = combineReducers({
    count
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer