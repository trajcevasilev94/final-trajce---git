import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getAllRecipes, createRecipes, updateRecipes, deleteRecipe } from "../../fetch/fetchRecipes";

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (arg, thunkAPI) => {
   try {
      const response =  getAllRecipes();
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
   }
});

export const fetchCreateRecipe = createAsyncThunk('recipes/fetchCreateRecipe', async (arg, thunkAPI) => {
   try {
      const user = thunkAPI.getState().user.user;
      const response = await createRecipes(arg, user?.token);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
   }
});

export const fetchUpdateRecipe = createAsyncThunk('recipes/fetchUpdateRecipe', async (arg, thunkAPI) => {
   try {
      const user = thunkAPI.getState().user.user;
      const response = await updateRecipes(arg.data, arg.recipeID, user?.token);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
   }
});

export const fetchDeleteRecipe = createAsyncThunk('recipes/fetchDeleteRecipe', async (arg, thunkAPI) => {
   try {
      const user = thunkAPI.getState().user.user;
      const response = await deleteRecipe(arg.recipeID, user?.token);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
   }
});

const initialState = {
   entries: [],
   status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
   error: null
};

export const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchRecipes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if (action.payload !== "Not Found") {
               state.entries = action.payload;
            }
         })
         .addCase(fetchCreateRecipe.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.entries.push(action.payload);
         })
         .addCase(fetchUpdateRecipe.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const recipes = current(state.entries);
            if (action.payload !== 'Conflict') {
               const newState = recipes.map(recipe => {
                  if (recipe?._id === action.payload?._id) {
                     return action.payload;
                  }
                  return recipe;
               });
               state.entries = newState;
            }
         })
         .addCase(fetchDeleteRecipe.fulfilled, (state, action) => {
            state.status = 'succeeded';
            let recipes = current(state.entries);
            state.entries = recipes.filter(recipe => recipe?._id !== action.payload.id);
         });
   }
});

export const getRecipes = (state) => state.recipes.entries;
export const getRecipesStatus = (state) => state.recipes.status;
export const getRecipesFetchError = (state) => state.recipes.error;

export default recipesSlice.reducer;
