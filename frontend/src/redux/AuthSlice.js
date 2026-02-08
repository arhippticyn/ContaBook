import { createSlice } from "@reduxjs/toolkit"
import { GetUser, LoginUser, RegisterUser } from "./operation"

const AuthInitialState = {
    user: {username: null, email: null},
    token: '',
    isLogin: false,
    isRefreshing: false,
    error: null
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: AuthInitialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            state.isLogin = true
        },
        LogOut(state) {
            state.user = {username: null, email: null}
            state.token = ''
            state.isLogin = false
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase(RegisterUser.pending, (state) => {
            state.isRefreshing = true;
          })
          .addCase(RegisterUser.fulfilled, (state, action) => {
            state.isRefreshing = false;
            state.user = action.payload;
          })
          .addCase(RegisterUser.rejected, (state, action) => {
            state.isRefreshing = false;
            state.error = action.payload;
          })
          .addCase(LoginUser.pending, (state) => {
            state.isRefreshing = true;
          })
          .addCase(LoginUser.fulfilled, (state, action) => {
            state.isRefreshing = false;
            state.token = action.payload.access_token;
            state.isLogin = true;
          })
          .addCase(LoginUser.rejected, (state, action) => {
            state.isRefreshing = false;
            state.error = action.payload;
          })
          .addCase(GetUser.pending, (state) => {
            state.isRefreshing = true;
          })
          .addCase(GetUser.fulfilled, (state, action) => {
            state.isRefreshing = false;
            state.user = action.payload;
          })
          .addCase(GetUser.rejected, (state, action) => {
            state.isRefreshing = false;
            state.error = action.payload;
          });
    }
})

export const { setToken, LogOut } = AuthSlice.actions

export const AuthReducer = AuthSlice.reducer