import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../data/ConstTexts";
const getmoveUrl = backendUrl + "/api/transfer/pallet-transfer-paginated-list/";
const moveCreateUrl = backendUrl + "/api/move/move-list/";
const editmoveUrl = backendUrl + "/api/move/move-detail/";
const movedeleteUrl = backendUrl + "/api/transfer/pallet-transfer-delete/";
const initialState = {
  response: "",
  count: "",
  next: "",
  previous: "",
  results: [],
  isLoading: false,
  errorInmove: "",
};

export const getmove = createAsyncThunk(
  "getmove",
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
      } else {
        const { data } = await axios.get(getmoveUrl, config);
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createmove = createAsyncThunk(
  "createmove",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(moveCreateUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editmove = createAsyncThunk(
  "editmove",
  async ({ id, token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(editmoveUrl + id + "/", json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const movedelete = createAsyncThunk(
  "movedelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(movedeleteUrl + id + "/", config);

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const moveSlice = createSlice({
  name: "move",
  initialState,
  reducers: {
    emptymove(state) {
      state.response = "";
      state.count = "";
      state.next = "";
      state.previous = "";
      state.results = [];
      state.isLoading = false;
      state.errorInmove = "";
      state.moveDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getmove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getmove.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.count = action.payload.data.count;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.results = action.payload.data.results;
        state.errorInmove = "";
      })
      .addCase(getmove.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInmove = action.payload.detail;
        state.response = "error";
        state.count = "";
        state.next = "";
        state.previous = "";
        state.results = [];
        // storage.removeItem('persist:login')
      })
      .addCase(createmove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createmove.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createmove.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editmove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editmove.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editmove.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(movedelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(movedelete.fulfilled, (state, action) => {
        state.results = state.results.filter(
          (item) => item.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(movedelete.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { emptymove } = moveSlice.actions;

export default moveSlice.reducer;
