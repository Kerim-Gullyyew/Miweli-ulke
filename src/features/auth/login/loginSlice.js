import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const loginUrl = backendUrl + "/api/auth/login/";

const profileUrl = backendUrl + "/api/auth/current-profile/";
const changePasswordUrl = backendUrl + "/api/auth/change-password/";


const initialState = {
  token: "",
  refresh: "",
  username: "",
  user_id: "",
  groups: [],
  isLoading: false,
  errorInLogin: "",
  profile: [],
};

export const userLogin = createAsyncThunk(
  "login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(loginUrl, { username, password });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(changePasswordUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "profile",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(profileUrl,config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser(state) {
      state.token = "";
      state.refresh = "";
      state.username = "";
      state.user_id = "";
      state.groups = [];
      state.isLoading = false;
      state.errorInLogin = "";
      state.profile = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user_id = action.payload.user.id;
        state.token = action.payload.access;
        state.refresh = action.payload.refresh;
        state.username = action.payload.user.username;
        state.groups = action.payload.user.groups;
        state.errorInLogin = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInLogin = action.payload;
        state.user_id = "";
        state.token = "";
        state.refresh = "";
        state.username = "";
        state.groups = [];

        // storage.removeItem('persist:login')
      })
      
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.data;
        state.errorInLogin = "";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorInLogin = action.payload;

        state.profile = [];

      })


      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
