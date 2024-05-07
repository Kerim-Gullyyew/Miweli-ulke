import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../data/ConstTexts";
  const getMoveDetailUrl = backendUrl + "/api/transfer/pallet-transfer-detail/";
  const editmovedetailUrl = backendUrl + "/api/transfer/pallet-transfer-update/";
  const createmovedetailUrl = backendUrl + "/api/transfer/pallet-transfer-create/";

  const initialState = {
    response: "",
    data: [],
    isLoading: false,
    error: "",
  };

  export const getMoveDetail = createAsyncThunk(
    "getMoveDetail",
    async ({ token, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(getMoveDetailUrl + id + "/", config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const editmovedetail = createAsyncThunk(
    "editmovedetail",
    async ({ id, token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(editmovedetailUrl + id + "/", json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const createmovedetail = createAsyncThunk(
    "createmovedetail",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(createmovedetailUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );




  const moveSlice = createSlice({
    name: "move",
    initialState,
    reducers: {
      emptyMove(state) {
        state.isLoading = false;
        state.data = [];
        state.response = "";
        state.error = "";
      },
    },
    extraReducers: (builder) => {
      builder
    
        .addCase(getMoveDetail.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getMoveDetail.fulfilled, (state, action) => {
          state.data = action.payload["data"];
          state.error = "";
          state.isLoading = false;
  
        })
        .addCase(getMoveDetail.rejected, (state, action) => {
          state.response = "";
          state.error = action.payload.detail;
          state.isLoading = false;
        })

        .addCase(editmovedetail.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(editmovedetail.fulfilled, (state, action) => {
            state.error = "";
            state.isLoading = false;
    
          })
          .addCase(editmovedetail.rejected, (state, action) => {
            state.response = "";
            state.error = action.payload.detail;
            state.isLoading = false;
          })
          .addCase(createmovedetail.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createmovedetail.fulfilled, (state, action) => {
            state.error = "";
            state.isLoading = false;
    
          })
          .addCase(createmovedetail.rejected, (state, action) => {
            state.response = "";
            state.error = action.payload.detail;
            state.isLoading = false;
          })
        ;


    },
  });
  
  export const { emptyMove } = moveSlice.actions;
  
  export default moveSlice.reducer;