import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { backendUrl } from '../../../rootUrl';

const deliveryUrl = backendUrl + "/api/order/delivery-payment/";

const initialState = {
    isLoading: false,
    isSuccess: false,
    delivery: {}
}

export const getDelivery = createAsyncThunk(
    "delivery/getDelivery",
    async (arg, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const { data } = await axios.get(deliveryUrl);
            return data;

        } catch (err) {
            if (!err.response) {
                throw err
            }
            rejectWithValue(err.response.data)
        }
    }
)

const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {},
    extraReducers: {
        [getDelivery.pending]: (state) => {
            state.isLoading = true;
        },
        [getDelivery.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.delivery = payload['data'];
            state.isSuccess = true;
        },
        [getDelivery.rejected]: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        }
    }
})

export default deliverySlice.reducer;