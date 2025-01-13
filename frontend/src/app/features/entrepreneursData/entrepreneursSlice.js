import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

export const loadEntrepreneurs = createAsyncThunk(
  'entrepreneurs/loadEntrepreneurs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/loadAllentrepreneurs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEntrepreneur = createAsyncThunk(
  'entrepreneurs/deleteEntrepreneur',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/deleteEntrepreneur/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEntrepreneurs = createAsyncThunk(
  'entrepreneurs/deleteEntrepreneurs',
  async (ids, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete('/deleteEntrepreneurs', { data: { ids } });
      return ids;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEntrepreneur = createAsyncThunk(
  'entrepreneurs/updateEntrepreneur',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/updateEntrepreneur/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const entrepreneursSlice = createSlice({
  name: 'entrepreneurs',
  initialState: {
    entrepreneurs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEntrepreneurs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadEntrepreneurs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entrepreneurs = action.payload;
      })
      .addCase(loadEntrepreneurs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEntrepreneur.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEntrepreneur.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entrepreneurs = state.entrepreneurs.filter(
          (entrepreneur) => entrepreneur._id !== action.payload
        );
      })
      .addCase(deleteEntrepreneur.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEntrepreneurs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEntrepreneurs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entrepreneurs = state.entrepreneurs.filter(
          (entrepreneur) => !action.payload.includes(entrepreneur._id)
        );
      })
      .addCase(deleteEntrepreneurs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEntrepreneur.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEntrepreneur.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Replace the updated entrepreneur in the state
        state.entrepreneurs = state.entrepreneurs.map((entrepreneur) =>
          entrepreneur._id === action.payload._id ? action.payload : entrepreneur
        );
      })
      .addCase(updateEntrepreneur.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default entrepreneursSlice.reducer;
