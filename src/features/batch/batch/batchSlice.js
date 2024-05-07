import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const batchUrl = backendUrl + "/api/batch/batch-list/";
const batchCreateUrl = backendUrl + "/api/batch/batch-list/";
const editBatchUrl = backendUrl + "/api/batch/batch-detail/";
const getBatchFilterUrl = backendUrl + "/api/filter/batch-filter/";
const initialState = {
  response: "",
  count: "",
  next: "",
  previous: "",
  results: [],
  isLoading: false,
  errorInBatch: "",
};

export const getBatch = createAsyncThunk(
  "batch",
  async ({ token, link }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      if (link) {
      const { data } = await axios.get(link, config);
      return data;
      }else{
        const { data } = await axios.get(batchUrl, config);
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBatchFilter = createAsyncThunk(
  "getBatchFilter",
  async ({ token, search }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
        const { data } = await axios.get(getBatchFilterUrl + search, config);
        return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);




export const createBatch = createAsyncThunk(
  "createBatch",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(batchCreateUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editBatch = createAsyncThunk(
  "editBatch",
  async ({ id, token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(editBatchUrl + id + "/", json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {
    emptyBatch(state) {
      state.response = "";
      state.count = "";
      state.next = "";
      state.previous = "";
      state.results = [];
      state.isLoading = false;
      state.errorInBatch = "";
      state.batchDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.count = action.payload.data.count;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.results = action.payload.data.results;
        state.errorInBatch = "";
      })
      .addCase(getBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInBatch = action.payload.detail;
        state.response = "error";
        state.count = "";
        state.next = "";
        state.previous = "";
        state.results = [];
        // storage.removeItem('persist:login')
      })
      .addCase(getBatchFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBatchFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.count = action.payload.data.count;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.results = action.payload.data.results;
        state.errorInBatch = "";
      })
      .addCase(getBatchFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInBatch = action.payload.detail;
        state.response = "error";
        state.count = "";
        state.next = "";
        state.previous = "";
        state.results = [];
      })
      .addCase(createBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBatch.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBatch.rejected, (state) => {
        state.isLoading = false;
      })
      
      .addCase(editBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBatch.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editBatch.rejected, (state) => {
        state.isLoading = false;
      });

  },
});

export const { emptyBatch } = batchSlice.actions;

export default batchSlice.reducer;
