import axios, { AxiosInstance } from 'axios';
import { fetchFromLocalStorage } from '../utils/localStorageUtils';

const transactionApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/transaction/',
  headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${fetchFromLocalStorage('accessToken')}`
  },
});

// Create a new transaction
export const createTransaction = async (transactionData: any): Promise<any> => {
  try {
    const response = await transactionApi.post('/', transactionData);
    return response.data; // Return the created transaction data
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Get all transactions
export const getAllTransactions = async (page: number, limit: number, startDate?: string | null, endDate?: string | null): Promise<any[]> => {
  const params: any = { page, limit };
  
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  try {
    const response = await transactionApi.get(`/?${new URLSearchParams(params)}`);
    return response.data; // Return the list of transactions
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};


// Get a specific transaction by ID
export const getTransactionById = async (transactionId: string): Promise<any> => {
  try {
    const response = await transactionApi.get(`/${transactionId}`);
    return response.data; // Return the transaction data
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Update a transaction by ID
export const updateTransaction = async (transactionId: string, transactionData: any): Promise<any> => {
  try {
    const response = await transactionApi.put(`/${transactionId}`, transactionData);
    return response.data; // Return the updated transaction data
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Delete a transaction by ID
export const deleteTransaction = async (transactionId: string): Promise<{ message: string }> => {
  try {
    await transactionApi.delete(`/${transactionId}`);
    return { message: "Transaction deleted successfully" }; // Return a success message
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
