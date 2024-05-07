import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../data/ConstTexts";

  const AttributeValueCreateUrl = backendUrl + "/api/transfer/transfer-attr-value-create/";
  const getTransferDetailUrl = backendUrl + "/api/transfer/pc-transfer-detail/";
  const AttributeValueEditUrl = backendUrl + "/api/transfer/transfer-attr-value-update/";
  const transferAttributeValueDeleteUrl = backendUrl + "/api/transfer/transfer-attr-value-update/";
  const createTransferPalletUrl = backendUrl + "/api/transfer/pallet-cell-transfer-create/";
  const editTransferPalletUrl = backendUrl + "/api/transfer/pallet-cell-transfer-update/";
  const transferPalletDeleteUrl = backendUrl + "/api/transfer/pallet-cell-transfer-delete/";

  const initialState = {
    response: "",
    data: [],
    isLoading: false,
    error: "",
  };


  export const getTransferDetail = createAsyncThunk(
    "getTransferDetail",
    async ({ token, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(getTransferDetailUrl + id + "/", config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  
  export const AttributeValueCreate = createAsyncThunk(
    "AttributeValueCreate",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(AttributeValueCreateUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const AttributeValueEdit = createAsyncThunk(
    "AttributeValueEdit",
    async ({ token, id, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(
          AttributeValueEditUrl + id + "/",
          json,
          config
        );
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const transferAttributeValueDelete = createAsyncThunk(
    "transferAttributeValueDelete",
    async ({ token, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.delete(
          transferAttributeValueDeleteUrl + id + "/",
          config
        );
        return id;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const createTransferPallet = createAsyncThunk(
    "createTransferPallet",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(createTransferPalletUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const editTransferPallet = createAsyncThunk(
    "editTransferPallet",
    async ({ token, id, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(
          editTransferPalletUrl + id + "/",
          json,
          config
        );
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const transferPalletDelete = createAsyncThunk(
    "transferPalletDelete",
    async ({ token, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.delete(
          transferPalletDeleteUrl + id + "/",
          config
        );
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
      editTransferDetailAttribute(state, action) {
        const cartItem = state.data.attributes.find((attr) => {
          return attr.attr_id === action.payload.data.id;
        });
        if (cartItem) {
          state.data.attributes = state.data.attributes.map((item) => {
            if (item.attr_id === action.payload.data.id) {
              return {
                id: item.id,
                value: item.value,
                name: action.payload.data.title,
                batch_id: item.batch_id,
                attr_id: item.attr_id,
              };
            }
            return item;
          });
        }
      },
      emptyTransfer(state) {
        state.isLoading = false;
        state.data = [];
        state.response = "";
        state.error = "";
      },
    },
    extraReducers: (builder) => {
      builder
    
        .addCase(getTransferDetail.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getTransferDetail.fulfilled, (state, action) => {
          state.data = action.payload["data"];
          state.error = "";
          state.isLoading = false;
  
        })
        .addCase(getTransferDetail.rejected, (state, action) => {
          state.response = "";
          state.error = action.payload.detail;
          state.isLoading = false;
        })

        .addCase(AttributeValueCreate.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(AttributeValueCreate.fulfilled, (state, action) => {
          state.data.attributes.push({
            id: action.payload.data.id,
            value: action.payload.data.value,
            attr_id: action.payload.data.attr_id,
            name: action.payload.data.name,
          });
          state.isLoading = false;
        })
        .addCase(AttributeValueCreate.rejected, (state) => {
          state.isLoading = false;
        })


        .addCase(AttributeValueEdit.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(AttributeValueEdit.fulfilled, (state, action) => {
          state.data.attributes = state.data.attributes.map((item) => {
            if (item.id === action.payload.data.id) {
              return {
                id: item.id,
                value: action.payload.data.value,
                name: item.name,
                attr_id: item.attr_id,
              };
            }
            return item;
          });
  
          state.isLoading = false;
        })
        .addCase(AttributeValueEdit.rejected, (state) => {
          state.isLoading = false;
        })


        .addCase(transferAttributeValueDelete.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(transferAttributeValueDelete.fulfilled, (state, action) => {
          state.data.attributes = state.data.attributes.filter(
            (item) => item.id !== action.payload
          );
          state.isLoading = false;
        })
        .addCase(transferAttributeValueDelete.rejected, (state) => {
          state.isLoading = false;
        })
        
        .addCase(createTransferPallet.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createTransferPallet.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(createTransferPallet.rejected, (state) => {
          state.isLoading = false;
        })
        
        .addCase(editTransferPallet.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(editTransferPallet.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(editTransferPallet.rejected, (state) => {
          state.isLoading = false;
        })
        
        .addCase(transferPalletDelete.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(transferPalletDelete.fulfilled, (state, action) => {
          state.data.pallet_transfers = state.data.pallet_transfers.filter(
            (item) => item.id !== action.payload
          );

          state.isLoading = false;
        })
        .addCase(transferPalletDelete.rejected, (state) => {
          state.isLoading = false;
        });


    },
  });
  
  export const { emptyTransfer, editTransferDetailAttribute } = transferSlice.actions;
  
  export default transferSlice.reducer;
  