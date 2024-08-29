import axios, { AxiosInstance } from 'axios';
import { fetchFromLocalStorage } from '../utils/localStorageUtils';

const uploadTransactionApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/transaction/upload',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${fetchFromLocalStorage('accessToken')}`
  },
});

export const uploadTransaction = async (transactionData: any): Promise<any> => {
    try {
      const response = await uploadTransactionApi.post('/', transactionData);
      return response.data; // Return the created transaction data
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error; // Rethrow the error for handling in the calling code
    }
  };

  const uploadBudgetApi: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/budget/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${fetchFromLocalStorage('accessToken')}`
    },
  });
  
  export const uploadBudget = async (budgetData: any): Promise<any> => {
      try {
        const response = await uploadBudgetApi.post('/', budgetData);
        return response.data; // Return the created transaction data
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw error; // Rethrow the error for handling in the calling code
      }
    };