import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../../data/ConstTexts";
  const productUnitUrl = backendUrl + "/api/product/units-list/";
  const editProductUnitUrl = backendUrl + "/api/product/units-update-delete/";
 
  const productUnitCreateUrl =
    backendUrl + "/api/product/units-create/";
  
  const initialState = {
    response: "",
    data: [],
    isLoading: false,
    errorInProductUnit: "",
  };
  
  export const getProductUnit = createAsyncThunk(
    "getProductUnit",
    async ({ token }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(productUnitUrl, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const createProductUnit = createAsyncThunk(
    "createProductUnit",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(productUnitCreateUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  
  
  export const editProductUnit = createAsyncThunk(
    "editProductUnit",
    async ({ token, json, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(editProductUnitUrl + id + "/", json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  
  
  const productUnitSlice = createSlice({
    name: "productUnit",
    initialState,
    reducers: {
      emptyproductUnit(state) {
        state.isLoading = false;
        state.data = [];
        state.response = "";
        state.errorInProductUnit = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProductUnit.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProductUnit.fulfilled, (state, action) => {
          state.response = action.payload.response;
          state.data = action.payload["data"];
          state.errorInProductUnit = "";
          state.isLoading = false;
  
        })
        .addCase(getProductUnit.rejected, (state, action) => {
          state.response = "";
          state.errorInProductUnit = action.payload.detail;
          state.data = [];
          state.isLoading = false;
        })

        .addCase(editProductUnit.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(editProductUnit.fulfilled, (state, action) => {
              state.data = state.data.map((item) => {
                  if (item.id === action.payload.data.id) {
                    return {
                      id: item.id,
                      title: action.payload.data.title,
                    };
                  }
                  return item;
                });
          
          state.isLoading = false;
        })
        .addCase(editProductUnit.rejected, (state) => {
          state.isLoading = false;
        })
  
        
  
        .addCase(createProductUnit.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createProductUnit.fulfilled, (state, action) => {
          state.data.push({
            id: action.payload.data.id,
            title: action.payload.data.title,
          });
          state.isLoading = false;
        })
        .addCase(createProductUnit.rejected, (state) => {
          state.isLoading = false;
        });
    },
  });
  
  export const { emptyProduct } = productUnitSlice.actions;
  
  export default productUnitSlice.reducer;
  