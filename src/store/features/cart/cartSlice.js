import { v4 as uuidv4 } from "uuid";
// import cogoToast from 'cogo-toast';
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const {singleProduct, option} = action.payload;
      const product = singleProduct;
      const cartItem = state?.cartItems?.find((item) => item?.id === option?.id);
      // state.cartItems = [];
      if (!cartItem) {
        state.cartItems.push({
          ...option,
          quantity: 1,
          cartItemId: uuidv4(),
          product: product,
        });
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.cartItemId === cartItem.cartItemId) {
            return {
              ...item,
              quantity: option.quantity
                ? item.quantity + option.quantity
                : item.quantity + 1,
            };
          }
          return item;
        });
      }


      // cogoToast.success("Added To Cart", {position: "bottom-left"});
    },
    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      // cogoToast.error("Removed From Cart", {position: "bottom-left"});
    },
    increaseQuantity(state, action) {
      const product = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      // cogoToast.warn("Item Decremented From Cart", {position: "bottom-left"});
    },

    decreaseQuantity(state, action) {
      const cart = action.payload;
      if (cart.cart.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== cart.cart.cartItemId
        );
        // cogoToast.error("Removed From Cart", {position: "bottom-left"});
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === cart.cart.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        // cogoToast.warn("Item Decremented From Cart", {position: "bottom-left"});
      }
    },
    deleteAllFromCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  deleteAllFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
