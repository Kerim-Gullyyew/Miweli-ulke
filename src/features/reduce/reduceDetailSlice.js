import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../data/ConstTexts";
  const getreduceDetailUrl = backendUrl + "/api/transfer/pallet-reduce-detail/";
  const editreducedetailUrl = backendUrl + "/api/transfer/pallet-reduce-update/";
  const createreducedetailUrl = backendUrl + "/api/transfer/pallet-reduce-create/";

  const initialState = {
    response: "",
    data: [],
    isLoading: false,
    error: "",
  };

  export const getreduceDetail = createAsyncThunk(
    "getreduceDetail",
    async ({ token, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(getreduceDetailUrl + id + "/", config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const editreducedetail = createAsyncThunk(
    "editreducedetail",
    async ({ id, token, formData }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(editreducedetailUrl + id + "/", formData, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const createreducedetail = createAsyncThunk(
    "createreducedetail",
    async ({ token, formData }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(createreducedetailUrl, formData, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );




  const reduceSlice = createSlice({
    name: "reduce",
    initialState,
    reducers: {
      emptyreduce(state) {
        state.isLoading = false;
        state.data = [];
        state.response = "";
        state.error = "";
      },
    },
    extraReducers: (builder) => {
      builder
    
        .addCase(getreduceDetail.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getreduceDetail.fulfilled, (state, action) => {
          state.data = action.payload["data"];
          state.error = "";
          state.isLoading = false;
  
        })
        .addCase(getreduceDetail.rejected, (state, action) => {
          state.response = "";
          state.error = action.payload.detail;
          state.isLoading = false;
        })

        .addCase(editreducedetail.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(editreducedetail.fulfilled, (state, action) => {
            state.error = "";
            state.isLoading = false;
    
          })
          .addCase(editreducedetail.rejected, (state, action) => {
            state.response = "";
            state.error = action.payload.detail;
            state.isLoading = false;
          })
          .addCase(createreducedetail.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createreducedetail.fulfilled, (state, action) => {
            state.error = "";
            state.isLoading = false;
    
          })
          .addCase(createreducedetail.rejected, (state, action) => {
            state.response = "";
            state.error = action.payload.detail;
            state.isLoading = false;
          })
        ;


    },
  });
  
  export const { emptyreduce } = reduceSlice.actions;
  
  export default reduceSlice.reducer;