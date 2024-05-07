import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const productDetailUrl = backendUrl + "/api/product/product-detail/";
const productAttributeValueCreateUrl = backendUrl + "/api/product/pp-attribute-create/";
const productAttributeValueEditUrl = backendUrl + "/api/product/pp-attribute-update/";
const initialState = {
  attribute: [],
  code: "",
  description: "",
  id: "",
  image: "",
  is_active: "",
  price: "",
  qrcode: "",
  title: "",
  unit: "",
  isLoading: false,
  errorInProductDetail: "",
};

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(productDetailUrl + id + "/", config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const productAttributeValueCreate = createAsyncThunk(
  "productAttributeValueCreate",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        productAttributeValueCreateUrl,
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const productAttributeValueEdit = createAsyncThunk(
  "productAttributeValueEdit",
  async ({ token, id, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        productAttributeValueEditUrl + id + "/",
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    editProductDetailAttribute(state, action){
      const cartItem = state?.attribute?.find((item) => item?.attr_id === action.payload.attr_id);
      if (cartItem) {
        state.attribute = state.attribute.map((item) => {
          if (item.attr_id === action.payload.attr_id) {
            return {
              name: action.payload.title,
              value: item.value,
              id: item.id,
              attr_id: item.attr_id,
            };
          }
          return item;
        });
      }
    },
    emptyProductDetail(state) {
      state.attribute = [];
      state.code = "";
      state.description = "";
      state.id = "";
      state.image = "";
      state.is_active = "";
      state.price = "";
      state.qrcode = "";
      state.title = "";
      state.unit = "";
      state.isLoading = false;
      state.errorInProductDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attribute = action.payload.data.attribute;
        state.code = action.payload.data.code;
        state.description = action.payload.data.description;
        state.id = action.payload.data.id;
        state.image = action.payload.data.image;
        state.is_active = action.payload.data.is_active;
        state.price = action.payload.data.price;
        state.qrcode = action.payload.data.qrcode;
        state.title = action.payload.data.title;
        state.unit = action.payload.data.unit;
        state.errorInProductDetail = "";
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.attribute = "";
        state.code = "";
        state.description = "";
        state.id = "";
        state.image = "";
        state.is_active = "";
        state.price = "";
        state.qrcode = "";
        state.title = "";
        state.unit = "";
        state.errorInProductDetail = action.payload.detail;
      })

      .addCase(productAttributeValueCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productAttributeValueCreate.fulfilled, (state, action) => {
        state.attribute.push({
          id: action.payload.data.id,
          value: action.payload.data.value,
          name: action.payload.data.product_attribute_name,
          attr_id: action.payload.data.attr_id,
        });
        state.isLoading = false;
      })
      .addCase(productAttributeValueCreate.rejected, (state) => {
        state.isLoading = false;
      })



      .addCase(productAttributeValueEdit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productAttributeValueEdit.fulfilled, (state, action) => {
        state.attribute = state.attribute.map((item) => {
          if (item.id === action.payload.data.id) {
            return {
              name: item.name,
              value: action.payload.data.value,
              id: item.id,
              attr_id: item.attr_id,
            };
          }
          return item;
        });
        state.isLoading = false;
      })
      .addCase(productAttributeValueEdit.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { emptyProductDetail, editProductDetailAttribute } = productDetailSlice.actions;

export default productDetailSlice.reducer;
