import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../rootUrl";

const singleProductUrl = backendUrl + "/api/product/detail/";
const filterProductsUrl = backendUrl + "/api/product/list/";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isProductLoading: false,
  singleProduct: [],
  filterProducts: [],
  options: [],
};

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (arg, { rejectWithValue }) => {
    const { id } = arg;
    const detailUrl = singleProductUrl + id + "/";
    try {
      const { data } = await axios.get(detailUrl);
        return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const getFilterProducts = createAsyncThunk(
  "product/getFilterProducts",
  async (arg, { rejectWithValue }) => {
    const { search } = arg;

    try {
      const { data } = await axios.get(filterProductsUrl + search);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      state.singleProduct = payload["data"];
      state.options = payload["data"]["options"];
      state.isSuccess = true;
    },
    [getSingleProduct.rejected]: (state) => {
      state.isProductLoading = false;
      state.isSuccess = false;
    },

    [getFilterProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getFilterProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.filterProducts = payload["data"];
      state.isSuccess = true;
    },
    [getFilterProducts.rejected]: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});

export default productSlice.reducer;
