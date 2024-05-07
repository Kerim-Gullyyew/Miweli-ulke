import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../data/ConstTexts";
const cellUrl = backendUrl + "/api/stock/cell-detail/";
const initialState = {
  response: "",
  data: [],
  isLoading: false,
  errorIncell: "",
};

export const getcell = createAsyncThunk(
  "getcell",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(cellUrl + id + "/", config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    emptycell(state) {
    //   state.response = "";
    //   state.count = "";
    //   state.next = "";
    //   state.previous = "";
    //   state.results = [];
    //   state.isLoading = false;
    //   state.errorInStock = "";
    //   state.stockDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getcell.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcell.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.data = action.payload.data;
        state.errorIncell = "";
      })
      .addCase(getcell.rejected, (state, action) => {
        state.isLoading = false;
        state.errorIncell = action.payload.detail;
        state.response = "error";
        state.data = [];
      })
   
  },
});

export const { emptycell } = cellSlice.actions;

export default cellSlice.reducer;
