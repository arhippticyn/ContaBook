import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export const GetNews = createAsyncThunk(
  'news/GetNews',
  async (search, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
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
