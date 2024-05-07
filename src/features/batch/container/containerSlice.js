import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../data/ConstTexts";
const ContainerUrl = backendUrl + "/api/batch/container-list/";
const ContainerCreateUrl = backendUrl + "/api/batch/container-create/";
const ContainerEditUrl = backendUrl + "/api/batch/container-update-delete/";

const initialState = {
  response: "",
  count: "",
  next: "",
  previous: "",
  results: [],
  isLoading: false,
  errorInBatchContainer: "",
};

export const getBatchContainer = createAsyncThunk(
  "getBatchContainer",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(ContainerUrl, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createBatchContainer = createAsyncThunk(
  "createBatchContainer",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(ContainerCreateUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editBatchContainer = createAsyncThunk(
    "editBatchContainer",
    async ({ token, json, id }, { rejectWithValue }) => {
      try {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.put(ContainerEditUrl + id + "/", json, config);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const batchContainerSlice = createSlice({
  name: "batchContainer",
  initialState,
  reducers: {
    containerSlicePalletCreate(state, action){
      const cartItem = state.results.find((cont) => {
        return cont.id === action.payload.data.container_id;
      });
      if (cartItem) {
        let key = 0
        state.results.forEach(cont => {
          if (cont.id === action.payload.data.container_id) {
            state.results[key].pallets.push({
              id: action.payload.data.id,
              code: action.payload.data.code,
              title: action.payload.data.title,
              cell: action.payload.data.cell,
              transfer_id: action.payload.data.transfer_id,
              description: action.payload.data.description,
    
              product: action.payload.data.product,
              attributes: [],
            });
          }
          key = key + 1
        })
      }


    },
    editContainerListAttribute(state, action){
      const cartItem = state.results.find((cont) => {
        return cont.id === action.payload.cont_id;
      });
      if (cartItem) {
        let key = 0
        state.results.forEach(cont => {
          if (cont.id === action.payload.cont_id) {
            state.results[key].attributes = state.results[key].attributes.map((attr) => {
              if (attr.id === action.payload.id) {
                return {
                  id: attr.id,
                  name: action.payload.new_name,
                  value: attr.value,
                };
              }
              return attr;
            })
          }
          key = key + 1
        })

        // state.results = state.results.map((item) => {
        //   if (item.id === action.payload.cont_id) {
        //     state.results[key].attributes.map((attr) => {
        //       if (attr.id === action.payload.id) {
        //         return {
        //           id: item.id,
        //           name: action.payload.new_name,
        //           value: item.value,
        //         };
        //       }
        //     })
        //   }
        //   key = key + 1;
        //   return item;
        // });
      }
    },
    emptybatchContainer(state) {
      state.response = "";
      state.count = "";
      state.next = "";
      state.previous = "";
      state.results = [];
      state.isLoading = false;
      state.errorInBatchContainer = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBatchContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBatchContainer.fulfilled, (state, action) => {
        state.errorInBatchContainer = "";
        state.isLoading = false;
        state.response = action.payload.response;

        state.count = action.payload.data.count;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.results = action.payload.data.results;
      })
      .addCase(getBatchContainer.rejected, (state, action) => {
        state.response = action.payload.response;
        state.errorInBatchContainer = action.payload.detail;
        state.isLoading = false;

        state.count = "";
        state.next = "";
        state.previous = "";
        state.results = [];
      })

      
      .addCase(editBatchContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBatchContainer.fulfilled, (state, action) => {
        let id = action.payload.data.id;
        const cartItem = state.results.find((cont) => {
            return cont.id === id
        })
        if (cartItem) {
            state.results = state.results.map((item) => {
                if (item.id === action.payload.data.id) {
                  return {
                    attributes: action.payload.data.attributes,
                    created_at: action.payload.data.created_at,
                    id: action.payload.data.id,
                    id_number: action.payload.data.id_number,
                    title: action.payload.data.title,
                    type_code: action.payload.data.type_code,
                    pallet_count: action.payload.data.pallet_count,
                    updated_at: action.payload.data.updated_at,
                    pallets: action.payload.data.pallets,
                    
                  };
                }
                return item;
              });
        };
      })
      .addCase(editBatchContainer.rejected, (state) => {
        state.isLoading = false;
      })


      .addCase(createBatchContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBatchContainer.fulfilled, (state, action) => {
        state.results.push({
          id: action.payload.data.id,
          attributes: [],
          created_at: action.payload.data.created_at,
          id_number: action.payload.data.id_number,
          pallet_count: action.payload.data.pallet_count,
          pallets: [],
          title: action.payload.data.title,
          type_code: action.payload.data.type_code,
          updated_at: action.payload.data.updated_at,
        });
        state.isLoading = false;
      })
      .addCase(createBatchContainer.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { emptyBatch, editContainerListAttribute, containerSlicePalletCreate } = batchContainerSlice.actions;

export default batchContainerSlice.reducer;
