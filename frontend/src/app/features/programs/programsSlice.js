import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createProgram = createAsyncThunk(
  'programs/addProgram',
  async (programData, { rejectWithValue }) => {
    try {
      console.log(programData)
      const response = await axios.post('http://localhost:5000/addProgram', programData)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteProgram = createAsyncThunk(
  'programs/deleteProgram',
  async (programId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteProgram/${programId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateProgram = createAsyncThunk(
  'programs/updateProgram',
  async (programData, { rejectWithValue }) => {
    try {
      const { programId } = programData
      const response = await axios.put(
        `http://localhost:5000/updateProgram/${programId}`,
        programData,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const loadPrograms = createAsyncThunk(
  'programs/loadPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/loadPrograms')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    programs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProgram.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log(action.payload)
        state.programs.push(action.payload)
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteProgram.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.programs = state.programs.filter((program) => program._id !== action.payload._id)
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateProgram.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedProgram = action.payload
        const index = state.programs.findIndex((program) => program._id === updatedProgram._id)
        if (index !== -1) {
          state.programs[index] = updatedProgram
        }
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadPrograms.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPrograms.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.programs = action.payload
      })

      .addCase(loadPrograms.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default programsSlice.reducer
