import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../../data/ConstTexts";
  const batchContainerUrl = backendUrl + "/api/batch/cnt-attributes-list/";
  const batchContainerCreateUrl =
    backendUrl + "/api/batch/batch-container-create/";
  
  const initialState = {
    response: "",
    data: [],
    isLoading: false,
    errorInBatchContainer: "",
  };
  
  export const getBatchContainer = createAsyncThunk(
    "getBatchContainer",
    async ({ token }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(batchContainerUrl, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const createBatchContainer = createAsyncThunk(
    "createBatchContainer",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(batchContainerCreateUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  
  
  const batchContainerSlice = createSlice({
    name: "batchContainer",
    initialState,
    reducers: {
      emptybatchContainer(state) {
        state.isLoading = false;
        state.data = [];
        state.response = "";
        state.errorInBatchContainer = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getBatchContainer.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getBatchContainer.fulfilled, (state, action) => {
          state.response = action.payload.response;
          state.data = action.payload["data"];
          state.errorInBatchContainer = "";
          state.isLoading = false;
  
        })
        .addCase(getBatchContainer.rejected, (state, action) => {
          state.response = "";
          state.errorInBatchContainer = action.payload.detail;
          state.data = [];
          state.isLoading = false;
        })
  
        
  
        .addCase(createBatchContainer.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createBatchContainer.fulfilled, (state, action) => {
          state.data.push({
            id: action.payload.data.id,
            title: action.payload.data.title,
          });
          state.isLoading = false;
        })
        .addCase(createBatchContainer.rejected, (state) => {
          state.isLoading = false;
        });
    },
  });
  
  export const { emptyBatch } = batchContainerSlice.actions;
  
  export default batchContainerSlice.reducer;
  