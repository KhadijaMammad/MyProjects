import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    user_id: number;
    email?: string;
    username?: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
user: JSON.parse(localStorage.getItem("userData") || "null"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;