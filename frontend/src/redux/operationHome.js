import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`


export const GetNews = createAsyncThunk(
  'news/GetNews',
  async (search, { rejectWithValue }) => {
    try {
      const response = await axios.get(url, {
        params: {
          q: search,
          country: 'us',
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
        },
      })

      return response.data.articles
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
