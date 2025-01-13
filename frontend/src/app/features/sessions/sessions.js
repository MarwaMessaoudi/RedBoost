import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

export const loadSessions = createAsyncThunk(
  'sessions/loadSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/sessions');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: {
    sessions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSessions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sessions = action.payload;
      })
      .addCase(loadSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sessionsSlice.reducer;
