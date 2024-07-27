// src/features/transactionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../../services/transaction'; // Adjust the import path as necessary

interface Transaction {
  id:string,
  user_id: string;
  amount: number;
  description?: string;
  category_id: string;
  date: Date;
  type: 'expense' | 'income';
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Async thunk for fetching all transactions
export const fetchTransactions = createAsyncThunk('transactions/fetchAll', async () => {
  const response = await getAllTransactions();
  return response;
});

// Async thunk for creating a transaction
export const addTransaction = createAsyncThunk('transactions/add', async (transactionData: Transaction) => {
  const response = await createTransaction(transactionData);
  return response;
});

// Async thunk for updating a transaction
export const editTransaction = createAsyncThunk('transactions/edit', async ({ transactionId, transactionData }: { transactionId: string; transactionData: Transaction }) => {
  const response = await updateTransaction(transactionId, transactionData);
  return response;
});

// Async thunk for deleting a transaction
export const removeTransaction = createAsyncThunk('transactions/remove', async (transactionId: string) => {
  await deleteTransaction(transactionId);
  return transactionId; // Return the ID of the deleted transaction
});

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
        state.transactions = action.payload; // Set transactions on successful fetch
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
        state.transactions.push(action.payload); // Add new transaction
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
        const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
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
        state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload); // Remove transaction
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      });
  },
});

// Export actions and reducer
export default transactionSlice.reducer;
