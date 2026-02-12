import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './AuthSlice'
import { ContactReducer } from './ContactSlice'
import { HomeReducer } from './HomeSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        contact: ContactReducer,
        news: HomeReducer
    } 
})