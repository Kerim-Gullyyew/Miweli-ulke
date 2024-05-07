import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../../../../data/ConstTexts";

  const createPalletAttributeUrl = backendUrl + "/api/batch/pallet-attr-create/";
  const getPalletAttributeUrl = backendUrl + "/api/batch/pallet-attr-list/";
  const editPalletAttributeUrl = backendUrl + "/api/batch/pallet-attr-update/";
  const initialState = {
    response: "",
    data: [],
    isLoading: false,
    errorInPalletAttribute: "",
  };
  
  export const getPalletAttribute = createAsyncThunk(
    "getPalletAttribute",
    async ({ token }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(getPalletAttributeUrl, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const createPalletAttribute = createAsyncThunk(
    "createPalletAttribute",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(createPalletAttributeUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const editPalletAttribute = createAsyncThunk(
    "editPalletAttribute",
    async ({ token, json, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(editPalletAttributeUrl + id + "/", json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  
  
  const palletAttributeSlice = createSlice({
    name: "palletAttribute",
    initialState,
    reducers: {
     
      emptypalletAttribute(state) {
        state.isLoading = false;
        state.data = [];
        state.response = "";
        state.errorInPalletAttribute = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPalletAttribute.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getPalletAttribute.fulfilled, (state, action) => {
          state.response = action.payload.response;
          state.data = action.payload["data"];
          state.errorInPalletAttribute = "";
          state.isLoading = false;
  
        })
        .addCase(getPalletAttribute.rejected, (state, action) => {
          state.response = "";
          state.errorInPalletAttribute = action.payload.detail;
          state.data = [];
          state.isLoading = false;
        })
  
        
  
        .addCase(createPalletAttribute.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createPalletAttribute.fulfilled, (state, action) => {
          state.data.push({
            id: action.payload.data.id,
            title: action.payload.data.title,
          });
          state.isLoading = false;
        })
        .addCase(createPalletAttribute.rejected, (state) => {
          state.isLoading = false;
        })
  
  
        .addCase(editPalletAttribute.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(editPalletAttribute.fulfilled, (state, action) => {
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
        .addCase(editPalletAttribute.rejected, (state) => {
          state.isLoading = false;
        });
  
  
    },
  });
  
  export const { emptyPallet } = palletAttributeSlice.actions;
  
  export default palletAttributeSlice.reducer;
  