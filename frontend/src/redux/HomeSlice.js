import { createSlice } from "@reduxjs/toolkit"
import { GetNews } from "./operationHome"

const HomeInitialState = {
    newsArr: [],
    error: null,
    isRefreshing: false
}

const HomeSlice = createSlice({
    name: 'news',
    initialState: HomeInitialState,
    extraReducers: (builder) => {
        builder
             .addCase(GetNews.pending, (state) => {
                state.isRefreshing = true
             })
             .addCase(GetNews.fulfilled, (state, action) => {
                state.isRefreshing = false
                state.newsArr = action.payload
             })
             .addCase(GetNews.rejected, (state, action) => {
                state.isRefreshing = false
                state.error = action.payload
             })
    }
})

export const HomeReducer = HomeSlice.reducer