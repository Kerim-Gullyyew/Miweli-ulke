import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const getTransferAttributeUrl =
  backendUrl + "/api/transfer/transfer-attributes/";
const createAttributeUrl = backendUrl + "/api/transfer/transfer-attr-create/";
const transferAttributeEditUrl =
  backendUrl + "/api/transfer/transfer-attr-update/";
const initialState = {
  response: "",
  data: [],
  isLoading: false,
  error: "",
};

export const getTransferAttribute = createAsyncThunk(
  "getTransferAttribute",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(getTransferAttributeUrl, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editTransferAttribute = createAsyncThunk(
  "editTransferAttribute",
  async ({ token, id, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        transferAttributeEditUrl + id + "/",
        json,
        config
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createAttribute = createAsyncThunk(
  "createAttribute",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(createAttributeUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const transferAttributeSlice = createSlice({
  name: "transferAttributeSlice",
  initialState,
  reducers: {
    emptytransferAttribute(state) {
      state.isLoading = false;
      state.data = [];
      state.response = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransferAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransferAttribute.fulfilled, (state, action) => {
        state.response = action.payload.response;
        state.data = action.payload["data"];
        state.error = "";
        state.isLoading = false;
      })
      .addCase(getTransferAttribute.rejected, (state, action) => {
        state.response = "";
        state.error = action.payload.detail;
        state.data = [];
        state.isLoading = false;
      })

      .addCase(createAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAttribute.fulfilled, (state, action) => {
        state.data.push({
          id: action.payload.data.id,
          title: action.payload.data.title,
        });
        state.isLoading = false;
      })
      .addCase(createAttribute.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editTransferAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTransferAttribute.fulfilled, (state, action) => {
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
      .addCase(editTransferAttribute.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { emptytransferAttribute } = transferAttributeSlice.actions;

export default transferAttributeSlice.reducer;
