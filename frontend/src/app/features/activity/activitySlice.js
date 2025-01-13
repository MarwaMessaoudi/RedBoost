import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../../axiosInstance'
export const createActivity = createAsyncThunk(
  'activity/addActivity',
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`http://localhost:5000/addActivity`, activityData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Async thunk for deleting an activity
export const deleteActivity = createAsyncThunk(
  'activity/deleteActivity',
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:5000/deleteActivity/${activityId}`,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Async thunk for updating an activity
export const updateActivity = createAsyncThunk(
  'activity/updateActivity',
  async (activityData, { rejectWithValue }) => {
    try {
      const { activityId } = activityData
      const response = await axiosInstance.put(
        `http://localhost:5000/updateActivity/${activityId}`,
        activityData,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Async thunk for loading activities
export const loadActivity = createAsyncThunk(
  'activity/loadActivity',
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`http://localhost:5000/loadActivity/${activityId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Async thunk for loading activities by program ID
export const loadActivitiesByProgramId = createAsyncThunk(
  'activity/loadActivitiesByProgramId',
  async (programId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `http://localhost:5000/loadActivitiesByProgramId/${programId}`,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Activity slice with reducers and extraReducers
const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activity: {
      name: '',
      description: '',
      color: '',
      startTime: '',
      endTime: '',
      programId: '',
      createdBy: '',
    },
    allActivities: [],
    activitiesByProgramId: [],
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.activity = action.payload
        state.allActivities.push(action.payload)
        state.activitiesByProgramId.push(action.payload)
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateActivity.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.activity = action.payload
        state.allActivities.push(action.payload)
        state.activitiesByProgramId.push(action.payload)
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadActivity.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadActivity.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.activity = action.payload
      })
      .addCase(loadActivity.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadActivitiesByProgramId.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadActivitiesByProgramId.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.activitiesByProgramId = action.payload
      })
      .addCase(loadActivitiesByProgramId.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default activitySlice.reducer
