import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { backendUrl } from '../../../rootUrl';

const infoUrl = backendUrl + "/api/product/home-info/";

const initialState = {
    isLoading: false,
    isSuccess: false,
    mainInfo: []
}

export const getInfo = createAsyncThunk(
    "info/getInfo",
    async (arg, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const { data } = await axios.get(infoUrl);
            return data;

        } catch (err) {
            if (!err.response) {
                throw err
            }
            rejectWithValue(err.response.data)
        }
    }
)

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {},
    extraReducers: {
        [getInfo.pending]: (state) => {
            state.isLoading = true;
        },
        [getInfo.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.mainInfo = payload['data'];
            state.isSuccess = true;
        },
        [getInfo.rejected]: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        }
    }
})

export default infoSlice.reducer;