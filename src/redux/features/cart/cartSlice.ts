import { BedSize } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
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
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      const quantity = action.payload.quantity;

      if (existingItem) {
        if (quantity > 1) {
          existingItem.quantity += action.payload.quantity;
        } else if (quantity > 1) {
          existingItem.quantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
      toast.info("All cart items cleared");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
