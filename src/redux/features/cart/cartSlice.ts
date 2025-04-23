import { BedSize } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  size: BedSize;
  price: number;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        toast.info(`${existingItem.name} already in cart `);
      } else {
        state.cart.push(newItem);
        toast.success(`${newItem.name} added to cart `);
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        const itemName = state.cart[itemIndex].name;
        state.cart.splice(itemIndex, 1);
        toast.info(`${itemName} removed from cart`);
      } else {
        toast.warning(`Item not found in cart: ${action.payload.id}`);
      }

      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = updatedCart;
    },
    // updateQuantity: (state) => {},
    // clearCart: (state) => {},
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
