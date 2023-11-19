import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../rootUrl";

const loginUrl = backendUrl + "/api/auth/login/";
const registerUrl = backendUrl + "/api/auth/register/";
const getProfileUrl = backendUrl + "/api/auth/profile-list/";
const updateProfileUrl = backendUrl + "/api/auth/profile-create/";

const getAddressUrl = backendUrl + "/api/auth/address-list/";
const updateAddressUrl = backendUrl + "/api/auth/address-create/";
const createAddressUrl = backendUrl + "/api/auth/address-create/";
const deleteAddressUrl = backendUrl + "/api/auth/address-delete/";

const createOrderUrl = backendUrl + "/api/order/order-create/";
const getOrderUrl = backendUrl + "/api/order/order-list/";
const getOrderDetailUrl = backendUrl + "/api/order/order-detail/";
const getOrderPaymentUrl = backendUrl + "/api/order/payment/";

const getPaymentUrl = backendUrl + "/api/order/orderid-request/?orderId=";
const getCheckPaymentUrl = backendUrl + "/api/order/check-payment/";

const initialState = {
  token: "",
  refresh: "",
  username: "",
  isAuthenticated: false,
  isLoading: false,
  isSmsSent: false,
  successMessage: "",
  smsResponse: "",
  verifyResponse: "",
  verifyMessage: "",
  regError: "",
  address: [],
  profile: [],
  orders: "",
  orderDetail: "",
  loginError: "",
  order: "",
  payment: "",
};

export const getProfileInfo = createAsyncThunk(
  "auth/getProfileInfo",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(getProfileUrl, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const updateProfileInfo = createAsyncThunk(
  "auth/updateProfileInfo",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(updateProfileUrl, formData, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

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
      await axios.delete(deleteAddressUrl + id + "/", config);
      return id;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);
export const getCheckPaymentInfo = createAsyncThunk(
  "auth/getCheckPaymentInfo",
  async ({ id, bank, token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      let fullUrl = getCheckPaymentUrl + id + "/?bank=" + bank;
      const { data } = await axios.get(fullUrl, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const getPaymentInfo = createAsyncThunk(
  "auth/getPaymentInfo",
  async ({ order_id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let fullUrl = getPaymentUrl + order_id;
      const { data } = await axios.get(fullUrl, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const getOrderInfo = createAsyncThunk(
  "auth/getOrderInfo",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      let fullUrl = getOrderUrl + url;
      const { data } = await axios.get(fullUrl, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const getOrderDetailInfo = createAsyncThunk(
  "auth/getOrderDetailInfo",
  async ({ id, token }, { rejectWithValue }) => {
    const getOrderDetailUrls = getOrderDetailUrl + id + "/";
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(getOrderDetailUrls, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const createOrderInfo = createAsyncThunk(
  "auth/createOrderInfo",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(createOrderUrl, json, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const getOrderPaymentInfo = createAsyncThunk(
  "auth/getOrderPaymentInfo",
  async ({ id, bank, token }, { rejectWithValue }) => {
    const getOrderPaymentUrls = getOrderPaymentUrl + id + "/?bank=" + bank;
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(getOrderPaymentUrls, config);
      return data;
    } catch {
      rejectWithValue("something went wrong");
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        registerUrl,
        { username, password },
        config
      );
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        loginUrl,
        { username, password },
        config
      );
      return data;
    } catch (err) {
      // if(!err.response){
      //     throw err
      // }
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      state.token = "";
      state.profile = [];
      state.address = [];
      state.orders = [];
      state.isAuthenticated = false;
      state.smsResponse = "";
      state.username = "";
      state.isLoading = false;
      state.successMessage = "";
      state.orderDetail = "";
      state.regError = "";
      state.verifyResponse = "";
      state.verifyMessage = "";
      state.isSmsSent = false;
      state.loginError = "";
      state.order = "";
      state.payment = "";
    },
    clearPaymentInfo(state) {
      state.order = "";
      state.payment = "";
    },
  },
  extraReducers: {
    [getProfileInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getProfileInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profile = action?.payload["data"];
    },
    [getProfileInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [updateProfileInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProfileInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profile = action.payload["data"];
    },
    [updateProfileInfo.rejected]: (state) => {
      state.isLoading = false;
    },
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
        item.id === action.payload.id ? { ...action.payload } : item
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

    [getCheckPaymentInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getCheckPaymentInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.payment = action.payload;
    },
    [getCheckPaymentInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [getPaymentInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getPaymentInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    },
    [getPaymentInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [getOrderInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload["data"];
    },
    [getOrderInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [createOrderInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [createOrderInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createOrderInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [getOrderDetailInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderDetailInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderDetail = action?.payload["data"];
    },
    [getOrderDetailInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [getOrderPaymentInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderPaymentInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      window.location.href = action.payload.formUrl;
    },
    [getOrderPaymentInfo.rejected]: (state) => {
      state.isLoading = false;
    },

    [userRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.regError = "";
      if (payload.response === "success") {
        state.isLoading = false;
        state.token = payload.data.token;
        state.isAuthenticated = true;
        state.regError = "";
        state.username = payload.data.username;
        window.location.reload(false);
      } else {
        state.regError = payload.message;
      }
    },
    [userRegister.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.regError = "err401";
    },

    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.access;
      state.refresh = payload.refresh;
      state.loginError = "";
      state.isAuthenticated = true;
      window.location.reload(false);
    },
    [userLogin.rejected]: (state) => {
      state.isLoading = false;
      state.loginError = "err401";
    },
  },
});

export const { logoutUser } = authSlice.actions;
export const { clearPaymentInfo } = authSlice.actions;

export default authSlice.reducer;
