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
  cart: JSON.parse(localStorage.getItem("cart") as string) || [],
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

      // STORE CART TO LOCAL STORAGE
      localStorage.setItem("cart", JSON.stringify(state?.cart));
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
      localStorage.setItem("cart", JSON.stringify(state?.cart));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity = Math.max(1, action.payload.quantity);
      }
      localStorage.setItem("cart", JSON.stringify(state?.cart));
    },

    clearCart: (state) => {
      state.cart = [];
      toast.info("All cart items cleared");
      localStorage.setItem("cart", JSON.stringify(state?.cart));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
