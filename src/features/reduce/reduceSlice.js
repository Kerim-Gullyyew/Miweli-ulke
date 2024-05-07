import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../data/ConstTexts";
const getreduceUrl = backendUrl + "/api/transfer/pallet-reduce-paginated-list/";
const reduceCreateUrl = backendUrl + "/api/reduce/reduce-list/";
const editreduceUrl = backendUrl + "/api/reduce/reduce-detail/";

const reducedeleteUrl = backendUrl + "/api/transfer/pallet-reduce-delete/";
const initialState = {
  response: "",
  count: "",
  next: "",
  previous: "",
  results: [],
  isLoading: false,
  errorInreduce: "",
};

export const getreduce = createAsyncThunk(
  "getreduce",
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
          const { data } = await axios.get(getreduceUrl, config);
          return data;
        }

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createreduce = createAsyncThunk(
  "createreduce",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(reduceCreateUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editreduce = createAsyncThunk(
  "editreduce",
  async ({ id, token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(editreduceUrl + id + "/", json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const reducedelete = createAsyncThunk(
  "reducedelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(
        reducedeleteUrl + id + "/",
        config
      );

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const reduceSlice = createSlice({
  name: "reduce",
  initialState,
  reducers: {
    emptyreduce(state) {
      state.response = "";
      state.count = "";
      state.next = "";
      state.previous = "";
      state.results = [];
      state.isLoading = false;
      state.errorInreduce = "";
      state.reduceDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getreduce.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getreduce.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.count = action.payload.data.count;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.results = action.payload.data.results;
        state.errorInreduce = "";
      })
      .addCase(getreduce.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInreduce = action.payload.detail;
        state.response = "error";
        state.count = "";
        state.next = "";
        state.previous = "";
        state.results = [];
      })
      .addCase(createreduce.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createreduce.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createreduce.rejected, (state) => {
        state.isLoading = false;
      })
      
      .addCase(editreduce.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editreduce.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editreduce.rejected, (state) => {
        state.isLoading = false;
      })

      
      .addCase(reducedelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reducedelete.fulfilled, (state, action) => {
        state.results = state.results.filter(
          (item) => item.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(reducedelete.rejected, (state) => {
        state.isLoading = false;
      });

  },
});

export const { emptyreduce } = reduceSlice.actions;

export default reduceSlice.reducer;
