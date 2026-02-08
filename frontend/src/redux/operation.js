import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const setAuthHeaders = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const RegisterUser = createAsyncThunk('auth/RegisterUser', async (user, {rejectWithValue}) => {
    try {
        const response = await axios.post('/auth/register', user)

        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const LoginUser = createAsyncThunk(
  'auth/LoginUser',
  async (creditials, { rejectWithValue }) => {
    try {
        const data = new URLSearchParams()
        data.append('username', creditials.username)
        data.append('password', creditials.password)

        const response = await axios.post('/auth/login', data)

        setAuthHeaders(response.data.access_token)

        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
  }
);

export const GetUser = createAsyncThunk('auth/GetUser', async (_, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token

        if (!token) return rejectWithValue('Invalid Token!')
        
        setAuthHeaders(token)

        const response = await axios.get('/users/me')

        return response.data

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const AddContacnts = createAsyncThunk('contact/AddContacnts', async (contact, { rejectWithValue }) => {
    try {
        const response = await axios.post('/contacts', contact);

        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const GetContact = createAsyncThunk('contact/GetContact', async (_,{ rejectWithValue }) => {
    try {
        const response = await axios.get('/contact');

        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
});