import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null
};

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://ozone-web-server.vercel.app/api/auth/register',
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: 'Registration failed' });
        }
    }
);

// Async thunk for login a user
export const loginUser = createAsyncThunk(
    '/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://ozone-web-server.vercel.app/api/auth/login',
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: 'Registration failed' });
        }
    }
);



export const logoutUser = createAsyncThunk(
    "/shop/logout",
    async (_, { rejectWithValue }) => { 
        try {
            const response = await axios.post(
                "https://ozone-web-server.vercel.app/api/auth/logout",
                {},
                { withCredentials: true }
            );
            localStorage.removeItem("token"); 
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Logout failed" });
        }
    }
);



export const checkAuth = createAsyncThunk(
    "/auth/checkauth",
  
    async () => {
      const response = await axios.get(
        "https://ozone-web-server.vercel.app/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
  
      return response.data;
    }
  );






// Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = !action.payload.success ? false : true;
                state.isLoading = false;
                state.user = ! action.payload.success ? null : action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })


            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = !action.payload.success ? false : true;
                state.isLoading = false;
                state.user = ! action.payload.success ? null : action.payload.user;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            });

    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
