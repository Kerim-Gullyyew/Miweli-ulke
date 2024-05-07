import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../../data/ConstTexts";
const containerAttributeUrl = backendUrl + "/api/batch/cnt-attributes-list/";
const containerAttributeCreateUrl = backendUrl + "/api/batch/cnt-attr-create/";
const editContainerAttributeUrl = backendUrl + "/api/batch/cnt-attr-update-delete/";

const initialState = {
  response: "",
  data: [],
  isLoading: false,
  errorInContainerAttribute: "",
};

export const getContainerAttribute = createAsyncThunk(
  "getContainerAttribute",
  async ({ token }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(containerAttributeUrl, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createContainerAttribute = createAsyncThunk(
  "createContainerAttribute",
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(containerAttributeCreateUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editContainerAttribute = createAsyncThunk(
  "editContainerAttribute",
  async ({ token, json, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(editContainerAttributeUrl + id + "/", json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const containerAttributeSlice = createSlice({
  name: "containerAttribute",
  initialState,
  reducers: {
    emptycontainerAttribute(state) {
      state.isLoading = false;
      state.data = [];
      state.response = "";
      state.errorInContainerAttribute = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContainerAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContainerAttribute.fulfilled, (state, action) => {
        state.response = action.payload.response;
        state.data = action.payload["data"];
        state.errorInContainerAttribute = "";
        state.isLoading = false;

      })
      .addCase(getContainerAttribute.rejected, (state, action) => {
        state.response = "";
        state.errorInContainerAttribute = action.payload.detail;
        state.data = [];
        state.isLoading = false;
      })

      

      .addCase(createContainerAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContainerAttribute.fulfilled, (state, action) => {
        state.data.push({
          id: action.payload.data.id,
          title: action.payload.data.title,
        });
        state.isLoading = false;
      })
      .addCase(createContainerAttribute.rejected, (state) => {
        state.isLoading = false;
      })


      .addCase(editContainerAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContainerAttribute.fulfilled, (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id === action.payload.data.id) {
                  return {
                    id: action.payload.data.id,
                    title: action.payload.data.title,
                  };
                }
                return item;
              });
        
        state.isLoading = false;
      })
      .addCase(editContainerAttribute.rejected, (state) => {
        state.isLoading = false;
      });


  },
});

export const { emptyContainer } = containerAttributeSlice.actions;

export default containerAttributeSlice.reducer;
