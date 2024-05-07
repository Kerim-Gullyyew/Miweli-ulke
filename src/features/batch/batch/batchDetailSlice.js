import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const batchDetailUrl = backendUrl + "/api/batch/batch-detail/";
const batchAttributeValueCreateUrl = backendUrl + "/api/batch/bb-attr-create/";
const batchContainerDeleteUrl =
  backendUrl + "/api/batch/batch-container-update-delete/";
const batchattrdeleteUrl = backendUrl + "/api/batch/bb-attr-update/";
const batchAttributeValueEditUrl = backendUrl + "/api/batch/bb-attr-update/";
const batchContainerValueCreateUrl =
  backendUrl + "/api/batch/batch-container-create/";
const initialState = {
  id: "",
  title: "",
  description: "",
  transfer_id: "",
  arrived_at: "",
  attribute: [],
  containers: [],
  isLoading: false,
  errorInBatchDetail: "",
};

export const getBatchDetail = createAsyncThunk(
  "batchDetail",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(batchDetailUrl + id + "/", config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const batchAttributeValueCreate = createAsyncThunk(
  "batchAttributeValueCreate",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        batchAttributeValueCreateUrl,
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const batchAttributeValueEdit = createAsyncThunk(
  "batchAttributeValueEdit",
  async ({ token, id, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        batchAttributeValueEditUrl + id + "/",
        json,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const batchContainerValueCreate = createAsyncThunk(
  "batchContainerValueCreate",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        batchContainerValueCreateUrl,
        json,
        config
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const batchContainerDelete = createAsyncThunk(
  "batchContainerDelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(
        batchContainerDeleteUrl + id + "/",
        config
      );

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const batchattrdelete = createAsyncThunk(
  "batchattrdelete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.delete(
        batchattrdeleteUrl + id + "/",
        config
      );

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const batchDetailSlice = createSlice({
  name: "batchDetail",
  initialState,
  reducers: {

    batchDetailPalletAttributeValueDelete(state, action){
      let key = 0;
      state.containers.forEach((cont) => {
        if (cont.info.id === action.payload.cont_id) {
          let keypal = 0
          state.containers[key].info.pallets.forEach((pal) => {
            if (pal.id === action.payload.pallet_id) {
              state.containers[key].info.pallets[keypal].attributes = state.containers[key].info.pallets[keypal].attributes.filter((item) => item.id !== action.payload.attr_id);
            } 
            keypal = keypal + 1
          })
        }
        key = key + 1
      })

    },


    editbatchDetailPalletAttributeValue(state, action){
      let key = 0;
      state.containers.forEach((cont) => {
        if (cont.info.id === action.payload.cont_id) {
          let keypal = 0
          state.containers[key].info.pallets.forEach((pal) => {
            if (pal.id === action.payload.pallet_id) {
              state.containers[key].info.pallets[keypal].attributes = state.containers[key].info.pallets[keypal].attributes.map((attr) => {
                if (attr.id === action.payload.data.id) {
                  return {
                    id: attr.id,
                    value: action.payload.data.value,
                    name: attr.name,
                    attr_id: attr.attr_id,
                  }
                }
                return attr
              })
            }
            keypal = keypal + 1
          })
        }

        key = key + 1
      })
    },
    batchDetailPalletDelete(state, action){
      let key = 0;
      state.containers.forEach((cont) => {
        if (cont.info.id === action.payload.cont_id) {
          state.containers[key].info.pallets = state.containers[key].info.pallets.filter(
            (item) => item.id !== action.payload.id
          );
        }
        key = key + 1
      })
    },
    editBatchDetailPalletAttribute(state, action){
      
      let key = 0;
      state.containers.forEach((cont) => {
          let keypal = 0;

          cont.info.pallets.forEach((pal) => {

          })



          state.containers[key].info.pallets.forEach(() => {

            state.containers[key].info.pallets[keypal].attributes = state.containers[key].info.pallets[keypal].attributes.map((attr) => {
              if (attr.attr_id === action.payload.id) {
                return {
                  id: attr.id,
                  value: attr.value,
                  name: action.payload.title,
                  attr_id: attr.attr_id,
                };
              }
              return attr
            })
            keypal = keypal + 1
          })
        key = key + 1
      })


    },
    editBatchDetailPallet(state, action){
      let key = 0;
      state.containers.forEach((cont) => {
        if (cont.info.id === action.payload.container_id) {
          let keypal = 0;
          state.containers[key].info.pallets = state.containers[key].info.pallets.map((pal) => {
            if (pal.id === action.payload.pallet_id) {
              return {
                id: pal.id,
                code: action.payload.data.code,
                title: action.payload.data.title,
                cell: action.payload.data.cell,
                transfer_id: action.payload.data.transfer_id,
                description: action.payload.data.description,
                product: action.payload.data.product,
                attributes: action.payload.data.attributes,
              };
            }
            return pal
          })
          keypal = keypal + 1
        }
        key = key + 1
      })

    },

    batchDetailpalletAttributeCreate(state, action) {
      let key = 0;
      state.containers.forEach((cont) => {
        if (cont.info.id === action.payload.cont_id) {
          let keypal = 0;
          state.containers[key].info.pallets.forEach((pal) => {
            if (pal.id === action.payload.pallet_id) {
              state.containers[key].info.pallets[keypal].attributes.push({
                id: action.payload.data.id,
                value: action.payload.data.value,
                name: action.payload.data.name,
                attr_id: action.payload.data.attr_id,
              });
            }
            keypal = keypal + 1;
          });
        }
        key = key + 1;
      });
    },

    batchDetailPalletCreate(state, action) {
      let key = 0;
      state.containers.forEach((cont) => {
        if (cont.info.id === action.payload.data.container_id) {
          state.containers[key].info.pallets.push({
            id: action.payload.data.id,
            code: action.payload.data.code,
            title: action.payload.data.title,

            description: action.payload.data.description,
            cell: action.payload.data.cell,
            transfer_id: action.payload.data.transfer_id,
            product: action.payload.data.product,
            attributes: [],
          });
        }
        key = key + 1;
      });
    },
    editContainerAttributeValue(state, action) {
      let key = 0;
      state.containers = state.containers.map((cont) => {
        if (cont.info.id === action.payload.container_id) {
          state.containers[key].info.attributes = state.containers[
            key
          ].info.attributes.map((attr) => {
            if (attr.id === action.payload.id) {
              return {
                id: attr.id,
                name: attr.name,
                value: action.payload.value,
                attr_id: attr.attr_id,
              };
            }
            return attr;
          });
        }
        key = key + 1;
        return cont;
      });
    },
    batchContainerAttributeValueDelete(state, action) {
      let key = 0;
      state.containers = state.containers.map((cont) => {
        if (cont.info.id === action.payload.cont_id) {
          state.containers[key].info.attributes = state.containers[
            key
          ].info.attributes.filter(
            (item) => item.id !== action.payload.attr_id
          );
        }
        key = key + 1;
        return cont;
      });
    },
    batchDetailContainersAttributeCreate(state, action) {
      const id = action.payload.container_id;
      let key = 0;
      state.containers = state.containers.map((cont) => {
        if (cont.info.id === id) {
          state.containers[key].info.attributes.push({
            id: action.payload.id,
            value: action.payload.value,
            name: action.payload.name,
            attr_id: action.payload.container_attr_id,
          });
        }
        key = key + 1;
        return cont;
      });
    },
    editBatchDetailContainer(state, action) {
      let id = action.payload.id;
      const cartItem = state.containers.find((cont) => {
        return cont.info.id === id;
      });
      if (cartItem) {
        state.containers = state.containers.map((item) => {
          if (item.info.id === action.payload.id) {
            return {
              id: item.id,
              info: {
                id: action.payload.id,
                title: action.payload.title,
                id_number: action.payload.id_number,
                type_code: action.payload.type_code,
                pallet_count: action.payload.pallet_count,
                created_at: action.payload.created_at,
                updated_at: action.payload.updated_at,
                attributes: action.payload.attributes,
                pallets: action.payload.pallets,
              },
            };
          }
          return item;
        });
      }
    },
    editBatchDetailAttribute(state, action) {
      const cartItem = state.attribute.find((attr) => {
        return attr.attr_id === action.payload.data.id;
      });
      if (cartItem) {
        state.attribute = state.attribute.map((item) => {
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
    emptyBatchDetail(state) {
      state.id = "";
      state.title = "";
      state.transfer_id ="";
      state.description = "";
      state.arrived_at = "";
      state.attribute = [];
      state.containers = [];
      state.isLoading = false;
      state.errorInBatchDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getBatchDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBatchDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.data.id;
        state.title = action.payload.data.title;
        state.description = action.payload.data.description;
        state.arrived_at = action.payload.data.arrived_at;
        state.transfer_id = action.payload.data.transfer_id;
        state.attribute = action.payload.data.attribute;
        state.containers = action.payload.data.containers;
        state.errorInBatchDetail = "";
      })
      .addCase(getBatchDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.id = "";
        state.title = "";
        state.description = "";
        state.arrived_at = "";
        state.transfer_id = "";
        state.attribute = [];
        state.containers = [];
        state.errorInBatchDetail = action.payload.detail;
      })
      .addCase(batchAttributeValueCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchAttributeValueCreate.fulfilled, (state, action) => {
        state.attribute.push({
          id: action.payload.data.id,
          value: action.payload.data.value,
          name: action.payload.data.name,
        });
        state.isLoading = false;
      })
      .addCase(batchAttributeValueCreate.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(batchAttributeValueEdit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchAttributeValueEdit.fulfilled, (state, action) => {
        state.attribute = state.attribute.map((item) => {
          if (item.id === action.payload.data.id) {
            return {
              id: item.id,
              value: action.payload.data.value,
              name: item.name,
              batch_id: item.batch_id,
              attr_id: item.attr_id,
            };
          }
          return item;
        });

        state.isLoading = false;
      })
      .addCase(batchAttributeValueEdit.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(batchContainerValueCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchContainerValueCreate.fulfilled, (state, action) => {
        state.containers.push({
          id: action.payload.data.id,
          info: {
            id: action.payload.data.info.id,
            title: action.payload.data.info.title,
            id_number: action.payload.data.info.id_number,
            type_code: action.payload.data.info.type_code,
            pallet_count: action.payload.data.info.pallet_count,
            created_at: action.payload.data.info.created_at,
            updated_at: action.payload.data.info.updated_at,
            attributes: action.payload.data.info.attributes,
            pallets: action.payload.data.info.pallets,
          },
        });
        state.isLoading = false;
      })
      .addCase(batchContainerValueCreate.rejected, (state) => {
        state.isLoading = false;
      })
      
      .addCase(batchattrdelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchattrdelete.fulfilled, (state, action) => {
        state.attribute = state.attribute.filter(
          (item) => item.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(batchattrdelete.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(batchContainerDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchContainerDelete.fulfilled, (state, action) => {
        state.containers = state.containers.filter(
          (item) => item.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(batchContainerDelete.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  emptyBatchDetail,
  batchDetailContainersAttributeCreate,
  editBatchDetailContainer,
  editContainerAttributeValue,
  editBatchDetailAttribute,
  batchDetailPalletCreate,
  batchDetailPalletDelete,
  editBatchDetailPallet,
  batchContainerAttributeValueDelete,
  batchDetailpalletAttributeCreate,
  editbatchDetailPalletAttributeValue,
  batchDetailPalletAttributeValueDelete,
} = batchDetailSlice.actions;

export default batchDetailSlice.reducer;
