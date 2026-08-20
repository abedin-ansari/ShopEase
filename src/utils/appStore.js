import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    // Whole app reducer which manages small slices
    cart: cartReducer, // Small store Slices (*** CAN HAVE MULTIPLE SMALL REDUCERS)
    user: userReducer,
  },
});

export default appStore;
