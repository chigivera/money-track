// src/features/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, sendVerificationCode, verifyEmail, createProfileUser, getProfileUser, getAuth } from '../../services/user'; // Adjust the import path as necessary
import { generateRandomPin } from '../../utils/utils';
import { fetchFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';

interface User {
  id: string;
  email: string;
  verified: boolean;
  createdAt?: Date; // Optional, depends on whether you need to access this field
  updatedAt?: Date; // Optional, depends on whether you need to access this field
}

interface Profile {
  userId: string;
  firstname: string;  
  lastname: string;
  city?: string;
  country?: string;
  zipcode?: string;
  phone_number?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserState {
  authenticated:boolean;
  user: null | User; // Adjusted to exclude the password field
  profile: any; // Adjust according to your profile schema
  loading: boolean;
  error: string | null;
  accessToken: string |null,

}

const initialState: UserState = {
  authenticated:false,
  user: null,
  profile:fetchFromLocalStorage('profile'),
  loading: false,
  error: null,
  accessToken: fetchFromLocalStorage('accessToken'),
};

// Async thunk for registering a user
export const register = createAsyncThunk('user/register', async (userData: any, { rejectWithValue }) => {
  try {
    const response = await registerUser(userData);
    return response; // Return the user data on success
  } catch (error: any) {
    return rejectWithValue(error.response.data); // Return error message
  }
});

// Async thunk for logging in a user
export const login = createAsyncThunk('user/login', async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    return response; // Return the user data on success
  } catch (error: any) {
    return rejectWithValue(error.response.data); // Return error message
  }
});


// Async thunk for sending a verification code
export const sendCode = createAsyncThunk('user/sendCode', async (email: string, { rejectWithValue }) => {
  try {
    const pin = generateRandomPin(); // Generate a random pin
    await sendVerificationCode(email, pin);
    return { email, pin }; // Return the email and pin
  } catch (error: any) {
    return rejectWithValue(error.response.data); // Return error message
  }
});

// Async thunk for verifying the email code
export const verifyCode = createAsyncThunk('user/verifyCode', async ({ email, pin }: { email: string; pin: string }, { rejectWithValue }) => {
  try {
    await verifyEmail(email, pin);
    return { email, verified: true }; // Return the email and verified status
  } catch (error: any) {
    return rejectWithValue(error.response.data); // Return error message
  }
});

export const createProfile = createAsyncThunk('user/createProfile', async ({userData,token}: { userData: any; token: string }, { rejectWithValue }) => {
  try {
    console.log(userData)
    const response = await createProfileUser(userData,token);
    return response
  } catch (error: any) {
    return rejectWithValue(error.response.data); // Return error message
  }
});

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (token: string, { rejectWithValue }) => {
  try {
    const response = await getProfileUser(token);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const auth = createAsyncThunk('user/auth', async (token: any, { rejectWithValue }) => {
  try {
      const response = await getAuth(token);
      return response.data; // Ensure the response is correctly returned
  } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error authenticating'); // Handle error properly
  }
});
// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null; // Reset user on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user data on successful registration
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token
        saveToLocalStorage('accessToken',action.payload.token)

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(sendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendCode.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the response from sendCode thunk
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        // You might want to update the state with the newly created user data
        // For example, if you have a users array, you could push the new user into it
        // Or simply set the user object if you're managing a single user
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null; // Assert the type here
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Update the user state with the fetched profile data
        saveToLocalStorage('profile',action.payload)

      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(auth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(auth.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.authenticated = true; // Update the user state with the fetched profile data

      })
      .addCase(auth.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.authenticated = false; // Update the user state with the fetched profile data

        state.error = action.payload as string | null;
      });
    
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
