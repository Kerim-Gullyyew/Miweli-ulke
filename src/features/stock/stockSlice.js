import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../data/ConstTexts";
const stockUrl = backendUrl + "/api/stock/camera-list/";
const initialState = {
  response: "",
  data: [],
  isLoading: false,
  errorInStock: "",
};

export const getStock = createAsyncThunk(
  "stock",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(stockUrl, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    emptyStock(state) {
 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.data = action.payload.data;
        state.errorInStock = "";
      })
      .addCase(getStock.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInStock = action.payload.detail;
        state.response = "error";
        state.data = [];
      })
   
  },
});

export const { emptyStock } = stockSlice.actions;

export default stockSlice.reducer;
