import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ApiPayload {
  number1: number;
  number2: number;
}

export interface ApiState {
  result: unknown;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  result: null,
  loading: false,
  error: null,
};

const API_URL = "http://127.0.0.1:8000/api/sum/";

export const callApi = createAsyncThunk(
  "api/callApi",
  async (payload: ApiPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    clearResult(state) {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(callApi.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(callApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResult } = apiSlice.actions;
export default apiSlice.reducer;
