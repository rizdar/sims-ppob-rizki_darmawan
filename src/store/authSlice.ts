import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions/authAction";

interface UserInfo {
  token: string;
}

interface AuthResponse {
  status: number;
  message: string;
  data: UserInfo;
}

interface AuthState {
  loading: boolean;

  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,

  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // handle login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse | any>) => {
          state.loading = false;
          state.success = true;

          localStorage.setItem("token", action.payload.data.data.token);

          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 12);
          localStorage.setItem("expiration", expiration.toISOString());
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
