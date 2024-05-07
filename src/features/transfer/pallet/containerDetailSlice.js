import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const containerAttributeValueEditUrl =
  backendUrl + "/api/batch/cc-attr-update-delete/";
const containerAttributeValueDeleteUrl =
  backendUrl + "/api/batch/cc-attr-update-delete/";
const containerDetailPalletDeleteUrl = backendUrl + "/api/batch/pallet-detail/";
const containerAttributeValueCreateUrl =
  backendUrl + "/api/batch/cc-attr-create/";
const containerPalletCreateUrl = backendUrl + "/api/batch/pallet-create/";

const initialState = {
  id: "",
  info: {
    attributes: [],
    created_at: "",
    id: "",
    id_number: "",
    pallet_count: "",
    pallets: [],
    title: "",
    type_code: "",
    updated_at: "",
  },
  isLoading: false,
  errorInContainerDetail: "",
};

export const containerDetailPalletDelete = createAsyncThunk(
  "containerDetailPalletDelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(
        containerDetailPalletDeleteUrl + id + "/",
        config
      );

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const containerAttributeValueCreate = createAsyncThunk(
  "containerAttributeValueCreate",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        containerAttributeValueCreateUrl,
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const containerPalletCreate = createAsyncThunk(
  "containerPalletCreate",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(containerPalletCreateUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const containerAttributeValueEdit = createAsyncThunk(
  "containerAttributeValueEdit",
  async ({ token, id, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        containerAttributeValueEditUrl + id + "/",
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const containerAttributeValueDelete = createAsyncThunk(
  "containerAttributeValueDelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(
        containerAttributeValueDeleteUrl + id + "/",
        config
      );
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const containerDetailSlice = createSlice({
  name: "containerDetail",
  initialState,
  reducers: {
    containerDetailPalletAttributeValueDelete(state, action) {

      let key = 0;
      state.info.pallets.forEach((pal) => {
        if (pal.id === action.payload.pallet_id) {
          state.info.pallets[key].attributes = state.info.pallets[
            key
          ].attributes.filter((item) => item.id !== action.payload.attr_id);
        }
        key = key + 1;
      });
    },

    editContainerDetailAttributeValue(state, action) {

      let key = 0;
      state.info.pallets.forEach((pal) => {
        if (pal.id === action.payload.pallet_id) {
          state.info.pallets[key].attributes = state.info.pallets[
            key
          ].attributes.map((attr) => {
            if (attr.id === action.payload.data.id) {
              return {
                id: attr.id,
                value: action.payload.data.value,
                name: attr.name,
                attr_id: attr.attr_id,
              };
            }
            return attr;
          });
        }
        key = key + 1;
      });
    },

    editContainerDetailPallet(state, action) {
      let key = 0;
      state.info.pallets = state.info.pallets.map((pal) => {
        if (pal.id === action.payload.pallet_id) {
          return {
            id: pal.id,
            code: action.payload.data.code,
            title: action.payload.data.title,
            description: action.payload.data.description,
            product: action.payload.data.product,
            cell: action.payload.data.cell,
            transfer_id: action.payload.data.transfer_id,
            attributes: action.payload.data.attributes,
          };
        }
        key = key + 1;
        return pal;
      });
    },

    containerDetailpalletAttributeCreate(state, action) {

      let key = 0;
      state.info.pallets.forEach((pal) => {
        if (pal.id === action.payload.pallet_id) {
          state.info.pallets[key].attributes.push({
            id: action.payload.data.id,
            value: action.payload.data.value,
            name: action.payload.data.name,
            attr_id: action.payload.data.attr_id,
          });
        }
        key = key + 1;
      });

 
    },

    editContainerDetailAttribute(state, action) {
      state.info.attributes = state.info.attributes.map((item) => {
        if (item.name === action.payload.old_name) {
          return {
            id: item.id,
            name: action.payload.new_name,
            value: item.value,
          };
        }
        return item;
      });
    },
    getContainerDetail(state, action) {
      state.id = action.payload.id;
      state.info = action.payload.info;
    },
    
    editContainerDetail(state, action) {
      state.info = {
        attributes: action.payload.attributes,
        created_at: action.payload.created_at,
        id: action.payload.id,
        id_number: action.payload.id_number,
        pallet_count: action.payload.pallet_count,
        pallets: action.payload.pallets,
        title: action.payload.title,
        type_code: action.payload.type_code,
        updated_at: action.payload.updated_at,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(containerAttributeValueCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(containerAttributeValueCreate.fulfilled, (state, action) => {
        state.info.attributes.push({
          id: action.payload.data.id,
          value: action.payload.data.value,
          name: action.payload.data.name,
          attr_id: action.payload.data.container_attr_id,
        });
        state.isLoading = false;
      })
      .addCase(containerAttributeValueCreate.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(containerPalletCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(containerPalletCreate.fulfilled, (state, action) => {

        state.info.pallets.push({
          id: action.payload.data.id,
          code: action.payload.data.code,
          title: action.payload.data.title,
          cell: action.payload.data.cell,
          transfer_id: action.payload.data.transfer_id,
          description: action.payload.data.description,

          product: action.payload.data.product,
          attributes: [],
        });
        state.isLoading = false;
      })
      .addCase(containerPalletCreate.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(containerDetailPalletDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(containerDetailPalletDelete.fulfilled, (state, action) => {
        state.info.pallets = state.info.pallets.filter(
          (item) => item.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(containerDetailPalletDelete.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(containerAttributeValueEdit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(containerAttributeValueEdit.fulfilled, (state, action) => {

        state.info.attributes = state.info.attributes.map((item) => {
          if (item.id === action.payload.data.id) {
            return {
              id: item.id,
              name: item.name,
              value: action.payload.data.value,
              attr_id: item.attr_id,
            };
          }
          return item;
        });

        state.isLoading = false;
      })
      .addCase(containerAttributeValueEdit.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(containerAttributeValueDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(containerAttributeValueDelete.fulfilled, (state, action) => {
        state.info.attributes = state.info.attributes.filter(
          (item) => item.id !== action.payload
        );
      
        state.isLoading = false;
      })
      .addCase(containerAttributeValueDelete.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  emptyContainerDetail,
  getContainerDetail,
  editContainerDetail,
  editContainerDetailAttribute,
  editContainerDetailAttributeValue,
  editContainerDetailPallet,
  containerDetailpalletAttributeCreate,
  containerDetailPalletAttributeValueDelete,
} = containerDetailSlice.actions;

export default containerDetailSlice.reducer;
