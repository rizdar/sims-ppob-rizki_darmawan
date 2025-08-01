import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProfile,
  updateProfile,
  getBalance,
} from "../actions/profileAction";

interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

interface ProfileResponse {
  status: number;
  message: string;
  data: ProfileData;
}

interface BalanceResponse {
  balance: number;
}

interface ProfileState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  data: ProfileResponse | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  balance: number | null;
}

const initialState: ProfileState = {
  email: null,
  firstName: null,
  lastName: null,
  profileImage: null,
  data: null,
  loading: false,
  error: null,
  success: false,
  balance: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetState: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer untuk fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<ProfileResponse | any>) => {
          const { email, first_name, last_name, profile_image } =
            action.payload.data;

          state.loading = false;
          state.email = email;
          state.firstName = first_name;
          state.lastName = last_name;
          state.profileImage = profile_image;
        }
      )
      .addCase(fetchProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching profile";
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<ProfileResponse | any>) => {
          state.loading = false;
          state.data = action.payload;
          state.success = true;
        }
      )
      .addCase(
        updateProfile.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to update profile.";
        }
      )

      //  get balance
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getBalance.fulfilled,
        (state, action: PayloadAction<BalanceResponse | any>) => {
          const { balance } = action.payload.data;

          state.loading = false;
          state.balance = balance;
        }
      )
      .addCase(getBalance.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching profile";
      });
  },
});

export const { resetState } = profileSlice.actions;
export default profileSlice.reducer;
