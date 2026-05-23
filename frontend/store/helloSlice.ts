import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface HelloState {
  data: unknown;
  loading: boolean;
  error: string | null;
}

const initialState: HelloState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchHello = createAsyncThunk(
  "hello/fetchHello",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/hello/");
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHello.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchHello.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHello.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default helloSlice.reducer;
