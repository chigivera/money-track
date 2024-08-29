import axios, { AxiosInstance } from 'axios';

const categoryApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/expense',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer <your_access_token>'
  },
});

// Create a new category
export const createCategory = async (categoryData: any): Promise<any> => {
  try {
    const response = await categoryApi.post('/', categoryData);
    return response.data; // Return the created category data
  } catch (error) {
    console.error("Error creating category:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Get all categories
export const getAllCategories = async (): Promise<any[]> => {
  try {
    const response = await categoryApi.get('/');
    return response.data; // Return the list of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Get a specific category by ID
export const getCategoryById = async (categoryId: string): Promise<any> => {
  try {
    const response = await categoryApi.get(`/${categoryId}`);
    return response.data; // Return the category data
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Update a category by ID
export const updateCategory = async (categoryId: string, categoryData: any): Promise<any> => {
  try {
    const response = await categoryApi.put(`/${categoryId}`, categoryData);
    return response.data; // Return the updated category data
  } catch (error) {
    console.error("Error updating category:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Delete a category by ID
export const deleteCategory = async (categoryId: string): Promise<{ message: string }> => {
  try {
    await categoryApi.delete(`/${categoryId}`);
    return { message: "Category deleted successfully" }; // Return a success message
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
