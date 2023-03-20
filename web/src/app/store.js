import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import recipesReducer from "../features/recipes/recipesSlice";

export const store = configureStore({
   reducer: {
      user: userReducer,
      recipes: recipesReducer
   }
});
