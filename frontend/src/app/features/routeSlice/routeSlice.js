import { createSlice } from '@reduxjs/toolkit'

const routeSlice = createSlice({
  name: 'routes',
  initialState: {
    dynamicRoutes: [],
  },
  reducers: {
    addRoutes: (state, action) => {
      state.dynamicRoutes = [...state.dynamicRoutes, ...action.payload]
    },
  },
})

export const { addRoutes } = routeSlice.actions
export default routeSlice.reducer
