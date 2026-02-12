import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'https://newsapi.org/v2'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export const GetNews = createAsyncThunk(
  'news/GetNews',
  async (search, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/everything`, {
        params: {
          q: search,
          apiKey: API_KEY,
        },
      })

      return response.data.articles
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
