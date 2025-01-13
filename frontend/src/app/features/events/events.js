import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = [...state.events, action.payload]
    },
    loadEvents: (state, action) => {
      state.events = action.payload
    },
  },
})

export const { setEvents, loadEvents } = eventsSlice.actions
export default eventsSlice.reducer
