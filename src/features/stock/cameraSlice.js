import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../data/ConstTexts";
const cameraUrl = backendUrl + "/api/stock/camera-detail/";
const initialState = {
  response: "",
  data: [],
  data2: [],
  isLoading: false,
  errorInCamera: "",
};

export const getCamera = createAsyncThunk(
  "getCamera",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(cameraUrl + id + "/", config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCamera2 = createAsyncThunk(
  "getCamera2",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(cameraUrl + id + "/", config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    emptyCamera(state) {
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
      .addCase(getCamera.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCamera.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.data = action.payload.data;
        state.errorInCamera = "";
      })
      .addCase(getCamera.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInCamera = action.payload.detail;
        state.response = "error";
        state.data = [];
      })

      .addCase(getCamera2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCamera2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.data2 = action.payload.data;
        state.errorInCamera = "";
      })
      .addCase(getCamera2.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInCamera = action.payload.detail;
        state.response = "error";
        state.data2 = [];
      })
   
  },
});

export const { emptyCamera } = cameraSlice.actions;

export default cameraSlice.reducer;
