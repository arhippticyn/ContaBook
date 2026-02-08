import { createSlice } from "@reduxjs/toolkit"
import { AddContacnts, GetContact } from "./operation"

const ContactInitialState = {
    contacts: [],
    isRefreshing: false,
    error: null,
    selectedId: null,
    AddPutPage: false
}

const ContactSlice = createSlice({
  name: 'contact',
  initialState: ContactInitialState,
  reducers: {
    SelectPage(state, action) {
      state.AddPutPage = false;
      state.selectedId = null;
    },
    selectContact(state, action) {
      state.selectedId = action.payload;
      state.AddPutPage = true;
    },
    selectAddPage(state) {
        state.AddPutPage = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddContacnts.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(AddContacnts.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.contacts.push(action.payload);
      })
      .addCase(AddContacnts.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(GetContact.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(GetContact.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.contacts = action.payload
      })
      .addCase(GetContact.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload
      })
  },
});

export const { SelectPage, selectContact, selectAddPage } = ContactSlice.actions

export const ContactReducer = ContactSlice.reducer