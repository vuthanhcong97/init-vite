import { createSlice } from "@reduxjs/toolkit";

const initialState = 0

const countSlice = createSlice({
    name: "count",
    initialState,
    reducers: {
        increase: (state) => {
            return state + 1
        },
        decrease: (state) => {
            state -= 1
            return state - 1
        }
    }
})

export const {
    increase,
    decrease
} = countSlice.actions

export default countSlice.reducer