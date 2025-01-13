// authSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isLogged = action.payload
    },
  },
})

export const { setAuthentication } = authSlice.actions

export default authSlice.reducer
