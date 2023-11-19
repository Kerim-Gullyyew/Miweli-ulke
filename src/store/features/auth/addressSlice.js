import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../rootUrl";
const getAddressUrl = backendUrl + "/api/auth/address-list/";
const updateAddressUrl = backendUrl + "/api/auth/address-create/";
const createAddressUrl = backendUrl + "/api/auth/address-create/";
const deleteAddressUrl = backendUrl + "/api/auth/address-delete/";

const initialState = {
  isLoading: false,
  address: [],
};

export const getAddressInfo = createAsyncThunk(
  "auth/getAddressInfo",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(getAddressUrl, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const createAddressInfo = createAsyncThunk(
  "auth/createAddressInfo",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(createAddressUrl, formData, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const updateAddressInfo = createAsyncThunk(
  "auth/updateAddressInfo",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(updateAddressUrl, formData, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const deleteAddressInfo = createAsyncThunk(
  "auth/deleteAddressInfo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(deleteAddressUrl + id + "/", config);
      return id;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: {
    [getAddressInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getAddressInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.address = action.payload;
    },
    [getAddressInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [createAddressInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [createAddressInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.address.push({
        ...action.payload,
      });
    },
    [createAddressInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [updateAddressInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAddressInfo.fulfilled]: (state, action) => {
      state.address = state.address.map((item) =>
        item.id === action.payload.id
          ? { ...action.payload }
          : item
      );
      state.isLoading = false;
    },
    [updateAddressInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [deleteAddressInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAddressInfo.fulfilled]: (state, action) => {
      state.address = state.address.filter(
        (item) => item.id !== action.payload
      );
      state.isLoading = false;
    },
    [deleteAddressInfo.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default addressSlice.reducer;
