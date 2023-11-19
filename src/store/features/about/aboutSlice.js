import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { backendUrl } from '../../../rootUrl';

const aboutUrl = backendUrl + "/api/product/about-us/";

const initialState = {
    isLoading: false,
    isSuccess: false,
    about: {}
}

export const getAbout = createAsyncThunk(
    "about/getAbout",
    async (arg, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const { data } = await axios.get(aboutUrl);
            return data;

        } catch (err) {
            if (!err.response) {
                throw err
            }
            rejectWithValue(err.response.data)
        }
    }
)

const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {},
    extraReducers: {
        [getAbout.pending]: (state) => {
            state.isLoading = true;
        },
        [getAbout.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.about = payload['data'];
            state.isSuccess = true;
        },
        [getAbout.rejected]: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        }
    }
})

export default aboutSlice.reducer;