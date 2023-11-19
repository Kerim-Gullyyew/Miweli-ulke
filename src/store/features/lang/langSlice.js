import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: false,
  lang: [],
};

export const changeLang = createAsyncThunk(
  "lang/changeLang",
);

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {},
  extraReducers: {
   
    [changeLang.pending]: (state) => {
      state.isLoading = true;
    },
    [changeLang.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.lang = payload;
      state.isSuccess = true;
    },
    [changeLang.rejected]: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});

export default langSlice.reducer;
