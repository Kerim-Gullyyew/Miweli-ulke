import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const batchAttributeUrl = backendUrl + "/api/batch/batch-attribute-list/";
const batchAttributeCreateUrl =
  backendUrl + "/api/batch/batch-attribute-create/";
const batchAttributeEditUrl = backendUrl + "/api/batch/batch-attribute-update/";
const initialState = {
  response: "",
  data: [],
  isLoading: false,
  errorInBatchAttribute: "",
};

export const getBatchAttribute = createAsyncThunk(
  "getBatchAttribute",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(batchAttributeUrl, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editBatchAttribute = createAsyncThunk(
  "editBatchAttribute",
  async ({ token, id, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(batchAttributeEditUrl + id + "/", json, config);
      
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const createBatchAttribute = createAsyncThunk(
  "createBatchAttribute",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(batchAttributeCreateUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const batchAttributeSlice = createSlice({
  name: "batchAttribute",
  initialState,
  reducers: {
    emptybatchAttribute(state) {
      state.isLoading = false;
      state.data = [];
      state.response = "";
      state.errorInBatchAttribute = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBatchAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBatchAttribute.fulfilled, (state, action) => {
        state.response = action.payload.response;
        state.data = action.payload["data"];
        state.errorInBatchAttribute = "";
        state.isLoading = false;

      })
      .addCase(getBatchAttribute.rejected, (state, action) => {
        state.response = "";
        state.errorInBatchAttribute = action.payload.detail;
        state.data = [];
        state.isLoading = false;
      })

      

      .addCase(createBatchAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBatchAttribute.fulfilled, (state, action) => {
        state.data.push({
          id: action.payload.data.id,
          title: action.payload.data.title,
        });
        state.isLoading = false;
      })
      .addCase(createBatchAttribute.rejected, (state) => {
        state.isLoading = false;
      })
      
      .addCase(editBatchAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBatchAttribute.fulfilled, (state, action) => {
        state.data = state.data.map((item) => {
          if (item.id === action.payload.data.id) {
            return {
              id: action.payload.data.id,
              title: action.payload.data.title,
            };
          }
          return item;
        });

        state.isLoading = false;
      })
      .addCase(editBatchAttribute.rejected, (state) => {
        state.isLoading = false;
      });

  },
});

export const { emptyBatch } = batchAttributeSlice.actions;

export default batchAttributeSlice.reducer;
