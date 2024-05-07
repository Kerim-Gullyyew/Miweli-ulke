import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../../data/ConstTexts";
  const productAttributeUrl = backendUrl + "/api/product/product-attribute-list/";
 
 const editProductAttributeUrl = backendUrl + "/api/product/product-attribute-update/";
  const productAttributeCreateUrl =
    backendUrl + "/api/product/product-attribute-create/";
  
  const initialState = {
    response: "",
    data: [],
    isLoading: false,
    errorInProductAttribute: "",
  };
  
  export const getProductAttribute = createAsyncThunk(
    "getProductAttribute",
    async ({ token }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(productAttributeUrl, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const editProductAttribute = createAsyncThunk(
    "editProductAttribute",
    async ({ token, json, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(editProductAttributeUrl + id + "/", json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const createProductAttribute = createAsyncThunk(
    "createProductAttribute",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(productAttributeCreateUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  
  
  const productAttributeSlice = createSlice({
    name: "productAttribute",
    initialState,
    reducers: {
      emptyproductAttribute(state) {
        state.isLoading = false;
        state.data = [];
        state.response = "";
        state.errorInProductAttribute = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProductAttribute.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProductAttribute.fulfilled, (state, action) => {

          state.response = action.payload.response;
          state.data = action.payload["data"];
          state.errorInProductAttribute = "";
          state.isLoading = false;
  
        })
        .addCase(getProductAttribute.rejected, (state, action) => {
          state.response = "";
          state.errorInProductAttribute = action.payload.detail;
          state.data = [];
          state.isLoading = false;
        })


        .addCase(editProductAttribute.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(editProductAttribute.fulfilled, (state, action) => {
         
              state.data = state.data.map((item) => {
                  if (item.id === action.payload.data.attr_id) {
                    return {
                      id: action.payload.data.attr_id,
                      title: action.payload.data.title,
                    };
                  }
                  return item;
                });
          
          state.isLoading = false;
        })
        .addCase(editProductAttribute.rejected, (state) => {
          state.isLoading = false;
        })
  
        
  
        .addCase(createProductAttribute.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createProductAttribute.fulfilled, (state, action) => {
          state.data.push({
            id: action.payload.data.id,
            title: action.payload.data.title,
          });
          state.isLoading = false;
        })
        .addCase(createProductAttribute.rejected, (state) => {
          state.isLoading = false;
        });
    },
  });
  
  export const { emptyProduct } = productAttributeSlice.actions;
  
  export default productAttributeSlice.reducer;
  