import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../data/ConstTexts";
const getTransferUrl = backendUrl + "/api/transfer/pc-transfer-list/";
const createCellTransferUrl =
  backendUrl + "/api/transfer/pallet-cell-transfer-create/";
const deleteCellTransferUrl =
  backendUrl + "/api/transfer/pallet-cell-transfer-delete/";
const editCellTransferUrl =
  backendUrl + "/api/transfer/pallet-cell-transfer-update/";
const createPcTransferUrl = backendUrl + "/api/transfer/pc-transfer-create/";
const transferdeleteUrl =
  backendUrl + "/api/transfer/pc-transfer-update-delete/";
const getTransferFilterUrl = backendUrl + "/api/filter/transfer-filter/";
const initialState = {
  response: "",
  data: [],
  isLoading: false,
  error: "",
};

export const getTransfer = createAsyncThunk(
  "getTransfer",
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
        const { data } = await axios.get(getTransferUrl, config);
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTransferFilter = createAsyncThunk(
  "getTransferFilter",
  async ({ token, search }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      
        const { data } = await axios.get(getTransferFilterUrl + search, config);
        return data;
      
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editCellTransfer = createAsyncThunk(
  "editCellTransfer",
  async ({ token, json, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        editCellTransferUrl + id + "/",
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCellTransfer = createAsyncThunk(
  "createCellTransfer",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(createCellTransferUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCellTransfer = createAsyncThunk(
  "deleteCellTransfer",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(
        deleteCellTransferUrl + id + "/",
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createPcTransfer = createAsyncThunk(
  "createPcTransfer",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(createPcTransferUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const transferdelete = createAsyncThunk(
  "transferdelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(transferdeleteUrl + id + "/", config);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    emptyTransfer(state) {
      state.isLoading = false;
      state.data = [];
      state.response = "";
      state.errorInTransfer = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransfer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransfer.fulfilled, (state, action) => {
        state.response = action.payload.response;
        state.data = action.payload["data"];
        state.error = "";
        state.isLoading = false;
      })
      .addCase(getTransfer.rejected, (state, action) => {
        state.response = "";
        state.error = action.payload.detail;
        state.data = [];
        state.isLoading = false;
      })

      .addCase(getTransferFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransferFilter.fulfilled, (state, action) => {
        state.response = action.payload.response;
        state.data = action.payload["data"];
        state.error = "";
        state.isLoading = false;
      })
      .addCase(getTransferFilter.rejected, (state, action) => {
        state.response = "";
        state.error = action.payload.detail;
        state.data = [];
        state.isLoading = false;
      })

      .addCase(transferdelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferdelete.fulfilled, (state, action) => {
        state.data.results = state.data.results.filter(
          (item) => item.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(transferdelete.rejected, (state) => {
        state.isLoading = false;
      })


      .addCase(createCellTransfer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCellTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createCellTransfer.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(createPcTransfer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPcTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createPcTransfer.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editCellTransfer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCellTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editCellTransfer.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteCellTransfer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCellTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCellTransfer.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { emptyTransfer } = transferSlice.actions;

export default transferSlice.reducer;
