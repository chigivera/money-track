// src/features/categorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../../services/category'; // Adjust the import path as necessary

interface Category {
  _id: string;
  name: string;
  expenseType:string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk for fetching all categories
export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const response = await getAllCategories();
  return response;
});

// Async thunk for creating a category
export const addCategory = createAsyncThunk('categories/add', async (categoryData: Category) => {
  const response = await createCategory(categoryData);
  return response;
});

// Async thunk for updating a category
export const editCategory = createAsyncThunk('categories/edit', async ({ categoryId, categoryData }: { categoryId: string; categoryData: Category }) => {
  const response = await updateCategory(categoryId, categoryData);
  return response;
});

// Async thunk for deleting a category
export const removeCategory = createAsyncThunk('categories/remove', async (categoryId: string) => {
  await deleteCategory(categoryId);
  return categoryId; // Return the ID of the deleted category
});

// Create the category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        console.log(state.categories) // Set categories on successful fetch
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload); // Add new category
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(category => category._id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload; // Update category
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(category => category._id !== action.payload); // Remove category
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      });
  },
});

// Export actions and reducer
export default categorySlice.reducer;
