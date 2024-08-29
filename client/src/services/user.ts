import axios, { AxiosInstance } from 'axios';
import { fetchFromLocalStorage } from '../utils/localStorageUtils';

const userApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/users',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer <your_access_token>'
  },
});
// Create a new user (Register)
export const registerUser = async (userData: any): Promise<any> => {
  try {
    const response = await userApi.post('/register', userData); // Assuming the endpoint is /register
    return response.data; // Return the created user data
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const createProfileUser = async (userData:any,token:string):Promise<any> => {
  try {
    const response = await userApi.post('/profile', userData,{
      headers: {
        'Authorization': `Bearer ${token}`
    }
    }); // Assuming the endpoint is /register
    return response.data; // Return the created user data
  } catch (error) {
    console.error("Error registering profile:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
}

export const getProfileUser = async (token: string): Promise<any> => {
  try {
    const response = await userApi.get('/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }); // Assuming the endpoint is /profile
    return response.data; // Return the user profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
export const refreshToken = async (token:string) => {
  const res = await userApi.post('/refresh-token', { token });
  return res.data;
}

// User login
export const loginUser = async (credentials: { email: string; password: string }): Promise<any> => {
  try {
    const response = await userApi.post('/login', credentials); // Assuming the endpoint is /login
    return response.data; // Return the login response data
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};


// // Create a new user
// export const createUser = async (userData: any): Promise<any> => {
//   try {
//     const response = await userApi.post('/', userData);
//     return response.data; // Return the created user data
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error; // Rethrow the error for handling in the calling code
//   }
// };

// // Get all users
// export const getAllUsers = async (): Promise<any[]> => {
//   try {
//     const response = await userApi.get('/');
//     return response.data; // Return the list of users
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error; // Rethrow the error for handling in the calling code
//   }
// };

// // Get a specific user by ID
// export const getUserById = async (userId: string): Promise<any> => {
//   try {
//     const response = await userApi.get(`/${userId}`);
//     return response.data; // Return the user data
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error; // Rethrow the error for handling in the calling code
//   }
// };

// // Update a user by ID
// export const updateUser = async (userId: string, userData: any): Promise<any> => {
//   try {
//     const response = await userApi.put(`/${userId}`, userData);
//     return response.data; // Return the updated user data
//   } catch (error) {
//     console.error("Error updating user:", error);
//     throw error; // Rethrow the error for handling in the calling code
//   }
// };

// // Delete a user by ID
// export const deleteUser = async (userId: string): Promise<{ message: string }> => {
//   try {
//     await userApi.delete(`/${userId}`);
//     return { message: "User deleted successfully" }; // Return a success message
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     throw error; // Rethrow the error for handling in the calling code
//   }
// };


export const sendVerificationCode = async (email: string, pin: string): Promise<any> => {
  try {
    const response = await userApi.post('/send-code', { email, pin });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Verify email code
export const verifyEmail = async (email: string, pin: string): Promise<any> => {
  try {
    const response = await userApi.post('/verify-code', { email, pin });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error verifying email code:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getAuth = async (accessToken: any): Promise<any> => {
  console.log(accessToken)
  try {
      const response = await userApi.post('/auth', {
           accessToken , // Correctly structure the request
      });
      return response;
  } catch (error) {
      console.error("Error getting auth", error);
      throw error; // Re-throw error for handling in the thunk
  }
};