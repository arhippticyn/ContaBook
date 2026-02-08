import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './AuthSlice'
import { ContactReducer } from './ContactSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        contact: ContactReducer
    } 
})