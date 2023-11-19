import { ToastContainer, toast } from 'react-toastify';
const { createSlice } = require('@reduxjs/toolkit');
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistItems: []
    },
    reducers: {
        addToWishlist(state, action) {
            const isInWishlist = state?.wishlistItems.findIndex(item => item?.id === action?.payload?.id);
            if (isInWishlist > -1) {
            state.wishlistItems = state?.wishlistItems.filter(item => item?.id !== action?.payload?.id);
            
        } else {
                state.wishlistItems.push(action?.payload);
            }
        },
        deleteFromWishlist(state, action) {
            state.wishlistItems = state?.wishlistItems?.filter(item => item?.id !== action?.payload?.id);
        },
        deleteAllFromWishlist(state) {
            state.wishlistItems = []
        }
    }
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;