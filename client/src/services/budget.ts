import axios, { AxiosInstance } from 'axios';

const budgetApi: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com/budgets',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer <your_access_token>'
  },
});

// Create a new budget
export const createBudget = async (budgetData: any): Promise<any> => {
  try {
    const response = await budgetApi.post('/', budgetData);
    return response.data; // Return the created budget data
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Get all budgets
export const getAllBudgets = async (): Promise<any[]> => {
  try {
    const response = await budgetApi.get('/');
    return response.data; // Return the list of budgets
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Get a specific budget by ID
export const getBudgetById = async (budgetId: string): Promise<any> => {
  try {
    const response = await budgetApi.get(`/${budgetId}`);
    return response.data; // Return the budget data
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Update a budget by ID
export const updateBudget = async (budgetId: string, budgetData: any): Promise<any> => {
  try {
    const response = await budgetApi.put(`/${budgetId}`, budgetData);
    return response.data; // Return the updated budget data
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Delete a budget by ID
export const deleteBudget = async (budgetId: string): Promise<{ message: string }> => {
  try {
    await budgetApi.delete(`/${budgetId}`);
    return { message: "Budget deleted successfully" }; // Return a success message
  } catch (error) {
    console.error("Error deleting budget:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
