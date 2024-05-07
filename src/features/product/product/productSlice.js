import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const productUrl = backendUrl + "/api/product/product-list/";
const productCreateUrl = backendUrl + "/api/product/product-create/";
const productEditUrl = backendUrl + "/api/product/product-update-delete/";
const getSimpleProductUrl = backendUrl + "/api/product/product-simple-list/";
const getProductFilterUrl = backendUrl + "/api/filter/product-filter/";
const initialState = {
  response: "",
  file: "",
  count: "",
  next: "",
  previous: "",
  results: [],
  simpleProduct: [],
  isLoading: false,
  errorInProduct: "",
};

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ token, id, formData }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        productEditUrl + id + "/",
        formData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(productCreateUrl, formData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product",
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
        const { data } = await axios.get(productUrl, config);
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductFilter = createAsyncThunk(
  "getProductFilter",
  async ({ token, search }, { rejectWithValue }) => {
    console.log(search);
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      if (search) {
        const { data } = await axios.get(getProductFilterUrl + search, config);
        return data;
      }else{
        const { data } = await axios.get(productUrl, config);
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSimpleProduct = createAsyncThunk(
  "getSimpleProduct",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(getSimpleProductUrl, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    emptyProduct(state) {
      //   state.response = "";
      //   state.count = "";
      //   state.next = "";
      //   state.previous = "";
      //   state.results = [];
      //   state.isLoading = false;
      //   state.errorInProduct = "";
      //   state.ProductDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.file = action.payload.file;
        state.response = action.payload.response;
        state.count = action.payload.data.count;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.results = action.payload.data.results;
        state.errorInProduct = "";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.file = "";
        state.errorInProduct = action.payload.detail;
        state.response = "error";
        state.count = "";
        state.next = "";
        state.previous = "";
        state.results = [];
      })

      .addCase(getProductFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.file = action.payload.file;
        state.response = action.payload.response;
        state.count = action.payload.data.count;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.results = action.payload.data.results;
        state.errorInProduct = "";
      })
      .addCase(getProductFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.file = "";
        state.errorInProduct = action.payload.detail;
        state.response = "error";
        state.count = "";
        state.next = "";
        state.previous = "";
        state.results = [];
      })

      .addCase(getSimpleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSimpleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.simpleProduct = action.payload.data;
      })
      .addCase(getSimpleProduct.rejected, (state) => {
        state.isLoading = false;
        state.simpleProduct = [];
      })

      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { emptyProduct } = productSlice.actions;

export default productSlice.reducer;
