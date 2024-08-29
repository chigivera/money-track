// src/features/transactionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} from '../../services/transaction'; // Adjust the import path as necessary
import { uploadTransaction } from '../../services/upload';

interface Transaction {
  _id: string;
  amount: number;
  description?: string;
  category_id: any;
  date: any;
  type: 'expense' | 'income';
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  total:number;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  total:0,
  loading: false,
  error: null,
};


interface FetchTransactionsArgs {
  page: number;
  limit: number;
  startDate?: string | null;  // Optional parameters for date filtering
  endDate?: string | null;
}

export const fetchTransactions = createAsyncThunk<any, FetchTransactionsArgs>(
  'transactions/fetchAll',
  async ({ page = 1, limit = 10, startDate, endDate }: FetchTransactionsArgs) => {
    const response = await getAllTransactions(page, limit, startDate, endDate);  // Pass dates to the API function

    // Ensure the returned data matches the TransactionsResponse shape
    return response;
  }
);
// Async thunk for creating a transaction
export const addTransaction = createAsyncThunk('transactions/add', async (transactionData: any) => {
  const response = await createTransaction(transactionData);
  return response;
});

// Async thunk for updating a transaction
export const editTransaction = createAsyncThunk('transactions/edit', async ({ transactionId, transactionData }: { transactionId: string; transactionData: any }) => {
  const response = await updateTransaction(transactionId, transactionData);
  return response;
});

// Async thunk for deleting a transaction
export const removeTransaction = createAsyncThunk('transactions/remove', async (transactionId: string) => {
  await deleteTransaction(transactionId);
  return transactionId; // Return the ID of the deleted transaction
});

export const importTransaction = createAsyncThunk('transactions/upload',async (transactionData: any) => {
  const response = await uploadTransaction(transactionData)
  return response
})


// Create the transaction slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.total = action.payload.total // Set transactions on successful fetch
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(editTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(transaction => transaction._id === action.payload._id);
        if (index !== -1) {
          state.transactions[index] = action.payload; // Update transaction
        }
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(removeTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload); // Remove transaction
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(importTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importTransaction.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming `action.payload` contains the imported transaction data
        state.transactions.push(action.payload);
      })
      .addCase(importTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

// Export actions and reducer
export default transactionSlice.reducer;
