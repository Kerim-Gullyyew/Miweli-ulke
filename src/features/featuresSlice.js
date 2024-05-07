import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  helper: "",
  nameHelper: "",
  nameContainer: "",
  nameHelperValue: "",
  nameHelperHelper: "",
  nameContainerHelper: "",
  nameHelperPallet: "",
  stockView: "",
  selectedCells: [],
  other: "",
  isLoading: false,
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    name(state, action) {
      state.name = action.payload;
    },
    emptySelected(state){
      state.selectedCells = [];
    },

    addToSelected(state, action){
      // const {selectedCell} = action.payload;
      const cartItem = state?.selectedCells?.find((item) => item?.id === action.payload?.id);
      if (!cartItem) {
        state.selectedCells.push({
          ...action.payload
        });
      }else{
        state.selectedCells = state.selectedCells.filter(
          (item) => item?.id !== action.payload?.id
        )
      }
    },

    stockView(state, action) {
      state.stockView = action.payload;
    },
    helper(state, action) {},
    nameHelper(state, action) {
        state.nameHelper = action.payload; 
    },
    nameContainer(state, action){
      state.nameContainer = action.payload;
    },
    nameHelperValue(state, action) {},
    nameHelperPallet(state, action) {
      state.nameHelperPallet = action.payload;
    },
    nameHelperHelper(state, action) {
      state.nameHelperHelper = action.payload;
    },
    other(state, action) {
      state.other = action.payload;
    },
  },
});

export const {
  name,
  helper,
  nameHelper,
  emptySelected,
  nameContainer,
  stockView,
  nameHelperPallet,
  nameHelperValue,
  nameHelperHelper,
  addToSelected,
  other,
} = featuresSlice.actions;

export default featuresSlice.reducer;
