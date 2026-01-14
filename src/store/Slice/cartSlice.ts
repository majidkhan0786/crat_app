import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Record<string, number>;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.items[action.payload] = (state.items[action.payload] || 0) + 1;
    },
    removeItem(state, action: PayloadAction<string>) {
      if (state.items[action.payload] > 1) {
        state.items[action.payload]--;
      } else {
        delete state.items[action.payload];
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
