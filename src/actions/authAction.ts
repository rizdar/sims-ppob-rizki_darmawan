import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Constant from "../constant/Constant";

interface RegisterUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface LoginUserPayload {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${Constant.BASEURL}/registration`,
        payload,
        config
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginUserPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(`${Constant.BASEURL}/login`, credentials, config);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
