import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../../data/ConstTexts";

  const createPalletAttributeValueUrl = backendUrl + "/api/batch/pp-attribute-create/";
  const containerPalletAttributeValueDeleteUrl = backendUrl + "/api/batch/pp-attr-update-delete/";
  const editContainerPalletUrl = backendUrl + "/api/batch/pallet-detail/";
  const palletAttributeValueEditUrl = backendUrl + "/api/batch/pp-attr-update-delete/";
const initialState = {
  response: "",

  attributes: [],
  code: "",
  description: "",
  id: "",
  product: [],
  title: "",
  cell: "",
  transfer_id: "",
  transfer_price: "",

  isLoading: false,
  errorInContainerPallet: "",
};

export const containerPalletAttributeValueDelete = createAsyncThunk(
  "containerPalletAttributeValueDelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(
        containerPalletAttributeValueDeleteUrl + id + "/",
        config
      );

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const palletAttributeValueEdit = createAsyncThunk(
  "palletAttributeValueEdit",
  async ({ token, id, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        palletAttributeValueEditUrl + id + "/",
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

  export const createPalletAttributeValue = createAsyncThunk(
    "createPalletAttributeValue",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(createPalletAttributeValueUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const createPalletAttributeValue2 = createAsyncThunk(
    "createPalletAttributeValue2",
    async ({ token, json }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(createPalletAttributeValueUrl, json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const editContainerPallet = createAsyncThunk(
    "editContainerPallet",
    async ({ token, json, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(editContainerPalletUrl + id + "/", json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const containerPalletSlice = createSlice({
  name: "containerPallet",
  initialState,
  reducers: {
    editContainerPalletAttribute(state, action) {
      state.attributes = state.attributes.map((attr) => {
        if (parseInt(attr.attr_id) === action.payload.data.id) {
          return {
            id: attr.id,
            value: attr.value,
            name: action.payload.data.title,
            attr_id: attr.attr_id,
          } 
        }
        return attr;
      })
    },
    getContainerPalletDetail(state, action) {
      state.response = "success";
      state.attributes = action.payload.attributes;
      state.code = action.payload.code;
      state.description = action.payload.description;
      state.id = action.payload.id;
      state.product = action.payload.product;
      state.title = action.payload.title;
      state.isLoading = false;
      state.errorInContainerPallet = "";
      state.cell = action.payload.cell;
      state.transfer_id = action.payload.transfer_id;
      state.transfer_price = action.payload.transfer_price;
    },
    emptyContainerPallet(state) {
    
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(palletAttributeValueEdit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(palletAttributeValueEdit.fulfilled, (state, action) => {
        state.attributes = state.attributes.map((item) => {
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
      .addCase(palletAttributeValueEdit.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(createPalletAttributeValue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPalletAttributeValue.fulfilled, (state, action) => {
        state.attributes.push({
          id: action.payload.data.id,
          value: action.payload.data.value,
          name: action.payload.data.name,
          attr_id: action.payload.data.attr_id,
        });
        state.isLoading = false;
      })
      .addCase(createPalletAttributeValue.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(createPalletAttributeValue2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPalletAttributeValue2.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPalletAttributeValue2.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(containerPalletAttributeValueDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(containerPalletAttributeValueDelete.fulfilled, (state, action) => {
        state.attributes = state.attributes.filter(
          (item) => item.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(containerPalletAttributeValueDelete.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editContainerPallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContainerPallet.fulfilled, (state, action) => {

        state.code = action.payload.data.code;
        state.description = action.payload.data.description;
        state.id = action.payload.data.id;
        state.product = action.payload.data.product;
        state.title = action.payload.data.title;
        state.cell = action.payload.data.cell;
        state.transfer_id = action.payload.data.transfer_id;
        state.transfer_price = action.payload.data.transfer_price;
          
        state.isLoading = false;
      })
      .addCase(editContainerPallet.rejected, (state) => {
        state.isLoading = false;
      });

  },
});

export const { emptyContainerPallet, editContainerPalletAttribute, getContainerPalletDetail } =
  containerPalletSlice.actions;

export default containerPalletSlice.reducer;
