// src/features/budgetSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createBudget,
  getAllBudgets,
  updateBudget,
  deleteBudget,
} from '../../services/budget'; // Adjust the import path as necessary
import { uploadBudget } from '../../services/upload';

interface Budget {
  _id: string; // Make sure this line exists
  category_id: any;
  budget_amount: number;
  budgetType: 'monthly' | 'yearly';
  month_year: string; // Format: YYYY-MM
  status: 'active' | 'exceeded' | 'completed';
}

interface BudgetState {
  budgets: Budget[];
  loading: boolean;
  total:number;
  error: string | null;
}

const initialState: BudgetState = {
  budgets: [],
  total:0,
  loading: false,
  error: null,
};

// Async thunk for fetching all budgets
export const fetchBudgets = createAsyncThunk(
  'budgets/fetchAll',
  async (params: { page: number; limit: number; startDate: string | null; endDate: string | null }) => {
    const response = await getAllBudgets(params);
    console.log(response)
    return response;
  }
);

// Async thunk for creating a budget
export const addBudget = createAsyncThunk('budgets/add', async (budgetData: Budget) => {
  const response = await createBudget(budgetData);
  return response;
});

// Async thunk for updating a budget
export const editBudget = createAsyncThunk('budgets/edit', async ({ budgetId, budgetData }: { budgetId: string; budgetData: Budget }) => {
  const response = await updateBudget(budgetId, budgetData);
  return response;
});

// Async thunk for deleting a budget
export const removeBudget = createAsyncThunk('budgets/remove', async (budgetId: string) => {
  await deleteBudget(budgetId);
  return budgetId; // Return the ID of the deleted budget
});

export const importBudget = createAsyncThunk('Budgets/upload',async (budgetData: any) => {
  const response = await uploadBudget(budgetData)
  return response
})


// Create the budget slice
const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload.budgets; // Assuming payload has a structure { budgets: Budget[], total: number }
        state.total = action.payload.total;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(addBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(editBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBudget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.budgets.findIndex(budget => budget._id === action.payload._id);
        if (index !== -1) {
          state.budgets[index] = action.payload; // Update budget
        }
      })
      .addCase(editBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(removeBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.filter(budget => budget._id !== action.payload); // Remove budget
      })
      .addCase(removeBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(importBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importBudget.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming `action.payload` contains the imported Budget data
        state.budgets.push(action.payload);
      })
      .addCase(importBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

// Export actions and reducer
export default budgetSlice.reducer;
